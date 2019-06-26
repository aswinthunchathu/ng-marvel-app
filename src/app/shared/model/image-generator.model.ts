enum types {
    default = '',
    standard_small = '/standard_small',
    standard_fantastic = '/standard_fantastic',
    portrait_small = '/portrait_small',
    portrait_incredible = '/portrait_incredible',
}

interface Image {
    actual: string
    placeholder: string
}

export enum ImageType {
    default = 'default',
    standard = 'standard',
    portrait = 'portrait',
}

export class ImageGenerator {
    public default: Image
    public standard: Image
    public portrait: Image

    constructor(private path: string, private extension: string) {
        this.default = {
            actual: `${this.path}${types.default}.${this.extension}`,
            placeholder: `${this.path}${types.default}.${this.extension}`,
        }

        this.standard = {
            actual: `${this.path}${types.standard_fantastic}.${this.extension}`,
            placeholder: `${this.path}${types.portrait_small}.${this.extension}`,
        }

        this.portrait = {
            actual: `${this.path}${types.portrait_incredible}.${this.extension}`,
            placeholder: `${this.path}${types.portrait_small}.${this.extension}`,
        }
    }
}
