const fs = require('fs');
const request = require('request');
const args = process.argv.slice(2);

const url = args[0];
const localFilePath = args[1];

const fetcher = function (url, localFilePath) {
    /*
    download resouce from URL to local machine
    print message "Donwloaded....
    */
    request(url, function (err, response, body) {
        if (err) {
            console.log("error", err);
        }
        fs.writeFile(localFilePath, body, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`Downloaded and saved ${body.length} to ${localFilePath}`);
            }
        })
    });

}



// Edge case 1, 2 and 3:
// if URL is not valid or file path in invalid

const ask = function () {
    process.stdout.write("Do you want to overwrite the file? (y/n) ");
    process.stdin.resume();
    process.stdin.on('data', function (data) {
        if (data.toString().trim() === 'y') {
            process.stdin.pause();
            fetcher(url, localFilePath);
        } else if (data.toString().trim() === 'n') {
            process.stdin.resume();
            console.log("Aborted!");
            process.exit();
        } else {
            console.log('Invalid input. Please try again');
        }
    });
}
if (!url || !localFilePath) {
    console.log("url or local file not specified");
}

if (fs.existsSync(localFilePath)) {
    console.log("File already exists", localFilePath);
    ask();
} else {
    fetcher(url, localFilePath);
}
