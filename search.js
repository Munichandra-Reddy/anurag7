const fs = require('fs');
const path = require('path');

function searchFiles(dir, filter, pattern) {
    let results = [];
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                if (file !== 'node_modules' && file !== '.next') {
                    results = results.concat(searchFiles(filePath, filter, pattern));
                }
            } else if (filter(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                if (content.includes(pattern)) {
                    results.push(filePath);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
    return results;
}

const dir = 'd:/Anurag lms/Anurag lms/src';
const filter = f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.jsx') || f.endsWith('.js');
const pattern = 'Revit Architecture';
console.log(searchFiles(dir, filter, pattern));
