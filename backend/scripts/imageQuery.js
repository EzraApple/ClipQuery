const { spawn } = require('child_process');
const path = require('path');

function imageQuery(imagePath, callback) {
    console.log('Ensuring environment is set up...');

    const setupProcess = spawn('./scripts/setup_environment.sh');

    setupProcess.stdout.on('data', (data) => {
        console.log(`Environment setup stdout: ${data}`);
    });

    setupProcess.stderr.on('data', (data) => {
        console.error(`Environment setup stderr: ${data}`);
    });

    setupProcess.on('close', (setupCode) => {
        console.log(`Environment setup process exited with code ${setupCode}`);
        if (setupCode !== 0) {
            console.error('Failed to set up the environment. Aborting image query operation.');
            return callback(new Error('Environment setup failed'), null);
        }

        console.log('Environment setup complete. Processing image query...');
        // Adjust the command to point to the Python interpreter in the virtual environment
        const pythonInterpreterPath = path.join(__dirname, './python/env/bin/python');  // Adjust as needed
        const scriptPath = path.join(__dirname, 'python/query_index.py');  // Adjust as needed

        const queryProcess = spawn(pythonInterpreterPath, [scriptPath, 'image', imagePath, 12]);
        let outputData = '';
        queryProcess.stdout.on('data', (data) => {
            outputData += data;
        });

        queryProcess.stderr.on('data', (data) => {
            console.error(`Image query stderr: ${data}`);
        });

        queryProcess.on('close', (code) => {
            console.log(`Image query process exited with code ${code}`);
            if (code !== 0) {
                return callback(new Error('Image query process failed'), null);
            }

            try {
                const filenames = JSON.parse(outputData);
                callback(null, filenames);
            } catch (error) {
                callback(error, null);
            }
        });
    });
}

module.exports = { imageQuery };
