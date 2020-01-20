import request from '@/utils/request'
import ApiService from "@/services/apiService";

class TourismService{
    static async GetSwpierList(){
        let token;
        await ApiService.GetApiToken().then(ret=>{
            token=ret;
        });
        let url='/api/TravelInfo/GetSwpierListAsync';
        return await request.get(url,null,token);
    }

    static async GetHotCityList(){
        let token;
        await ApiService.GetApiToken().then(ret=>{
            token=ret;
        });
        let url='/api/TravelInfo/GetHotCityListAsync';
        return await request.get(url,null,token);
    }
}
export default TourismService