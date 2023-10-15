const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const config = require('./dbconn'); // 引入配置文件
const mysql = require('mysql2/promise');

const questions = [
    {
        type: 'input',
        name: 'button_code',
        message: '请输入button_code:'
    },
    {
        type: 'input',
        name: 'button_text',
        message: '请输入button_text:'
    },
    {
        type: 'input',
        name: 'compoment_name',
        message: '请输入compoment_name:'
    },
    {
        type: 'input',
        name: 'DataGridCode',
        message: '请输入DataGridCode:'
    }
];

// 使用inquirer提问问题
inquirer.prompt(questions).then(async (answers) => {
    const buttonCode = answers.button_code;
    const buttonText = answers.button_text;
    const compomentName = answers.compoment_name;
    const DataGridCode = answers.DataGridCode;

    if (!buttonCode || !buttonText) {
        console.log('请提供button_code和button_text参数。');
        process.exit(1);
    }

    // 创建数据库连接
    const dbConfig = config.msyqldb;
    const connection = await mysql.createPool(dbConfig);

    try {
        const [rows] = await connection.execute(
            'INSERT INTO boss_portal_button (button_code, name, icon, style, file_path, is_standard, using_component, component_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [buttonCode, buttonText, 'File', 'primary', '', 'y', 'y', compomentName]
        );

        console.log(`成功插入数据到boss_portal_button表格,插入ID: ${rows.insertId}`);

        // 查询 boss_portal_button_actcode 表格中 datagrid_code 为 DataGridCode 的记录总数
        const [rowCount] = await connection.execute(
            'SELECT COUNT(*) as count FROM boss_portal_button_actcode WHERE datagrid_code = ?',
            [DataGridCode]
        );

        const count = rowCount[0].count;

        // 插入数据到 boss_portal_button_actcode 表格
        const [rowsActcode] = await connection.execute(
            'INSERT INTO boss_portal_button_actcode (button_code, datagrid_code, btnorder) VALUES (?, ?, ?)',
            [buttonCode, DataGridCode, count + 1]
        );

        console.log(`成功插入数据到 boss_portal_button_actcode 表格,插入ID: ${rowsActcode.insertId}`);
    } catch (err) {
        console.error(`插入数据时发生错误: ${err}`);
    } finally {
        // 关闭数据库连接
        await connection.end();
    }
});
