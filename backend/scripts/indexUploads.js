const { spawn } = require('child_process');
const path = require('path');

function indexUploadedImages() {
    return new Promise((resolve, reject) => {
        console.log('Starting environment setup...');
        const setupProcess = spawn('./scripts/setup_environment.sh');

        setupProcess.stdout.on('data', (data) => {
            console.log(`Setup stdout: ${data}`);
        });

        setupProcess.stderr.on('data', (data) => {
            console.error(`Setup stderr: ${data}`);
        });

        setupProcess.on('close', (setupCode) => {
            console.log(`Environment setup process exited with code ${setupCode}`);
            if (setupCode !== 0) {
                console.error('Environment setup failed, aborting index operation.');
                reject(new Error('Environment setup failed.'));
            } else {
                console.log('Environment setup complete. Starting indexing...');

                const pythonInterpreterPath = path.join(__dirname, './python/env/bin/python');
                const scriptPath = path.join(__dirname, 'python/index_uploads.py'); // Adjust the path to your Python script

                const indexProcess = spawn(pythonInterpreterPath, [scriptPath]);

                indexProcess.stdout.on('data', (data) => {
                    console.log(`Indexing stdout: ${data}`);
                });

                indexProcess.stderr.on('data', (data) => {
                    console.error(`Indexing stderr: ${data}`);
                });

                indexProcess.on('close', (indexCode) => {
                    console.log(`Indexing process exited with code ${indexCode}`);
                    if (indexCode === 0) {
                        resolve(); // Indexing was successful
                    } else {
                        reject(new Error(`Indexing process exited with code ${indexCode}`));
                    }
                });
            }
        });
    });
}

module.exports = { indexUploadedImages };
