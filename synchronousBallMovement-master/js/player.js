class Player{
    constructor() {
        this.rank = null;
        this.index = null;
        this.distance = 0;
        this.name = null;
    }
    getcount() {
        var playercountref = database.ref("playercount");
        playercountref.on("value",(data)=>{
            playercount = data.val();
        });
    }
    updatecount(count) {
        database.ref("/").update({
            playercount:count
        });
    }
    update() {
        var playerindex = "players/player" + playercount;
        database.ref(playerindex).set({
            name:this.name,
            distance:this.distance
        });
    }
    static getplayerinfo() {
        var playerinforef = database.ref("players");
        playerinforef.on("value",(data)=>{
            allplayers = data.val();
        })
    }
    getcarsatend() {
        var carsatendref = database.ref("carsatend");
        carsatendref.on("value",(data)=>{
            this.rank = data.val();
        })
    }

    static updatecarsatend(rank) {
        database.ref("/").update({
            carsatend:rank
        });
    }
}