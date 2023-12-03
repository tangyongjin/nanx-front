//  119.254.88.173  双 T4 机器

const root_dev = 'http://127.0.0.1';
const root_prod = 'http://119.254.88.173';

let root_url = root_dev;
const port = '9009';
const version = 'v2';

if (process.env.NODE_ENV === 'production') {
    root_url = root_prod;
}

export { version, root_url, port };
