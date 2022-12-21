const jwt = require('jsonwebtoken');

const APP_SECRET = "Graphql-is-aw3some";

// tokenを複合する関数
const getTokenPayload = (token) => {
  // トークンかされた前の情報(user.id)を複合する
  return jwt.verify(token, APP_SECRET);
};

// ユーザーIDを取得する
const getUserId = (req, authToken) => {
  if (req) {
    // ヘッダーを確認する, 認証権限があるか確認
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
      throw new Error("認証情報がありません");
    }

    const token = authHeader.replace("Bearer", "");

    if (!token) {
      throw new Error("トークンが見つかりませんでした");
    }
    // トークンを複合する
    const { userId } = getTokenPayload(token);
    return userId;
  } else if (authToken) {
    const { userId } = getTokenPayload(token);
    return userId;
  } 

  throw new Error("認証権限がありません");
};

module.exports = {
  APP_SECRET,
  getUserId
};
