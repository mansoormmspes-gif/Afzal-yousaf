const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

console.log('CWD:', process.cwd());
console.log('Data File Path:', dataFilePath);

try {
    if (fs.existsSync(dataFilePath)) {
        console.log('File exists.');
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const posts = JSON.parse(data);
        console.log(`Read ${posts.length} posts.`);
        console.log('First post title:', posts[0].title);
    } else {
        console.log('File does NOT exist.');
    }
} catch (error) {
    console.error('Error:', error);
}
