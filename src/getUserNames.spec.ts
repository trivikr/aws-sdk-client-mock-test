import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { getUserNames } from "./getUserNames";

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("index", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should get user names from the DynamoDB", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { id: "user1", name: "John" },
    });
    const names = await getUserNames(["user1"]);
    expect(names).toStrictEqual(["John"]);
  });
});
