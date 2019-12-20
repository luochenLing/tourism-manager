import configEmuns from '@/globalConfig/configEmuns'
class Search {
    //设置搜索缓存
    AddHistory(obj:string):string[]{
        let key=configEmuns.searchKey;
        let cookie = localStorage.getItem(key);
        if(cookie){
            let searchObj:string[] = JSON.parse(cookie);
            searchObj.push(obj);
            if(searchObj.length>10){
                searchObj.shift();
            }
            localStorage.setItem(key,JSON.stringify(searchObj));
            return searchObj.reverse();
        }else{
            let searchObj:string[]=[];
            searchObj.push(obj); 
            localStorage.setItem(key,JSON.stringify(searchObj));
            return searchObj.reverse();
        }
    }
}

export default Search;