import { AsyncHandler } from "../utils/AsyncHandler.utils.js";


const userVerify = AsyncHandler(async (req, res) => {
    // console.log(req.qurey);
    const countrycode = req.query.ccode;
    const number = req.query.phone;
    console.log(number);
    
    return res.status(200).json(
        {
            payload
        }
    );
});

export {
    userVerify
};