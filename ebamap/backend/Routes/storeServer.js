const express = require('express');
const router = express.Router();

/* 
    共通：パラメータ取得用のヘルパー関数（追加）
    フロントは axios.post({ params: { ... } }) を送っているため、
    バックエンドは req.body.params を最優先で読み込む必要がある。
*/
function getParams(req) {
    return {
        ...req.body?.params,
        ...req.body,
        ...req.query,
        ...req.params
    };
}

router.post('/:storeId', async (req, res) => {
    try {
        const { storeId } = getParams(req);

        // storeId が存在しない場合の処理
        if (!storeId) {
            return res.status(400).json({
                success: false,
                message: '店舗が選択されていません。'
            });
        }

        // DBから店舗情報を取得
        // storeId がなければ insert、あれば update を実行
        const [results] = await global.db.query(
            `SELECT * FROM stores WhERE id = ?`,
            [storeId]
        );

        if (results.length === 0) {
            await global.db.query(
                `INSERT INTO stores (id) VALUES (?)`,
                [storeId]
            );
        } else {
            await global.db.query(
                `UPDATE stores SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                [storeId]
            );
        }

        return res.json({
            success: true,
            message: '店舗情報を保存しました'
        });
        
    } catch (error) {
        console.error('Error in storeServer.js: ' + error);
        return res.status(500).json({
            success: false,
            message: 'サーバーエラーが発生しました。'
        });
    }
});

module.exports = router