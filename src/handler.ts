import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from "aws-sdk";
import * as dayjs from "dayjs";

function init() {
  const client = new DynamoDB.DocumentClient();
}

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  let div = 0;

  if (event.queryStringParameters && event.queryStringParameters.crash && event.queryStringParameters.crash === '1') {
    div = 42 / 0;
    throw new Error("BOOM");
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      div: div,
      date: dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'),
      message: 'hello init!',
      input: event,
    }, null, 2),
  };
}