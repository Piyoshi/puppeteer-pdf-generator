class ImageEncodingService {
    static embeddedImageSrcData(bitmap, imageFormat) {
        const base64Data = this.encodeBase64(bitmap);
        return `data:${imageFormat};base64,${base64Data}`;
    }
    static encodeBase64(bitmap) {
        return Buffer.from(bitmap).toString("base64")
    }
}

module.exports = ImageEncodingService;
