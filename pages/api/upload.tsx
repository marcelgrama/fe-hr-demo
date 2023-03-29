import multer from 'multer';
import aws from 'aws-sdk'

const Image = async (req, res) => {
    const s3 = new aws.S3();
    const { image, userId } = req.body.data;
    const imageUrl = image[0].data_url;
    const region = "eu-central-1"

    aws.config.update({ accessKeyId: accessKeyId, secretAccessKey, region: region });
    

    const base64Data = new Buffer.from(imageUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = imageUrl.split(';')[0].split('/')[1];

    const params = {
        Bucket: bucketName,
        Key: `${userId}.${type}`, // type is not required
        Body: base64Data,
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}` // required. Notice the back ticks
    }
    let location = '';
    let key = '';

    await s3.upload(params).promise().then(e => {
        res.status(200).json({ message: e });
    })


   


}

export default Image