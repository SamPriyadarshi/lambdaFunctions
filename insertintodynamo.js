console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
const querystring = require('querystring');

exports.handler = function(event, context, callback) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
    const params = querystring.parse(event.body);
    var tableName = "websitetable";
    var datetime = new Date().getTime().toString();
    const email = params.email;
    const message = params.message;
    const name = params.name;
    dynamodb.putItem({
            "TableName": tableName,
            "Item": {
                "email": {
                    "S": email
                },
                // "timedate": {
                //     "N": datetime
                // },
                "message": {
                    "S": message
                },
                "name": {
                    "S": name
                }
            }
        }, function(err, data) {
            if (err) {
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
                context.succeed('SUCCESS');
            }
        });
    // Generate HTML.
    // const html = `<!DOCTYPE html><p>You said: ` + message + `</p><p>Your name is: ` + name + '</p><p> and your email is: ' + email + '</p>';

    // // Return HTML as the result.
    // callback(null, html);
}
