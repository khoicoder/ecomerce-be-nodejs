const AccessService = require('../service/access.service');

class AccessController {
    signUp = async (req, res) => {
        try {
            const result = await AccessService.signUp(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({
                code: 'internal_error',
                message: error.message
            });
        }
    }
}

module.exports = new AccessController();
