const CACHE_KEY = "best_score";

function checkForStorage(){
    return typeof(Storage) !== "undefined";
}

function updateBestScore(score){
    if(checkForStorage()){
        localStorage.setItem(CACHE_KEY, score.toString());
    }
}