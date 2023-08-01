class InformationModel {
    video_src: string;
    status: boolean;
    information_content: string;
    constructor(data: { video_src: string;status: boolean; information_content: string;}) {
        const {
            video_src,
            status,
            information_content
        } = data;

        this.video_src = video_src;
        this.status = status;
        this.information_content = information_content;
    }
}

export {
    InformationModel
};