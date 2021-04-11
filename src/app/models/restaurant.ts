export interface IRestaurant {
    mission_name: string;
    mission_id: string;
    launch_year: number;
    manufacturers: string[];
    payload_ids: string[];
    details: string;
    launch_site: {
        site_name_long: string;
    }
    launch_success:boolean;
    links:{
        mission_patch_small:string;
        article_link:string;
        wikipedia:string;
        video_link:string;
    }
 
}