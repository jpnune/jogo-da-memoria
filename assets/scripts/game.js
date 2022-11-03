let game = {

    lock_mode: false,
    first_card: null,
    second_card:null,
    cards: null,
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react',
    ],


    set_card: function (id){
        let card = this.cards.filter(cards => cards.id ===id)[0]

        if (card.flipped || this.lock_mode){
            return false
        }

        if (!this.first_card){
            this.first_card = card
            this.first_card.flipped = true
            return true
        }else{
            this.second_card = card
            this.second_card.flipped = true
            this.lock_mode = true
            return true
        }
    },

    check_match: function(){
        return this.first_card.icon === this.second_card.icon
    },

    clear_cards: function(){
        this.first_card = null
        this.second_card = null
        this.lock_mode = false 
    },

    unflip_cards: function(){
        this.first_card.flipped = false
        this.second_card.flipped = false
        this.clear_cards()
    },


    check_gameover: function(){
        return this.cards.filter(card => !card.flipped).length == 0
    },


    create_cards_from_techs: function () {
        this.cards = []

        this.techs.forEach((tech) => {
            this.cards.push(this.create_pair_from_tech(tech))
        })

        this.cards = this.shuffle_cards2(this.cards.flatMap(pair => pair))  
    },

    create_pair_from_tech: function (tech) {
        return [{
            id: this.create_id_with_tech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.create_id_with_tech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    create_id_with_tech: function (tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    /*--- eu que fiz essa funçao achei mais facil de entender*/
    shuffle_cards2: function (cards) {
        let lista = []
        while (lista.length < 20) {
            index = Math.floor(Math.random() * 20)
            if (!lista.includes(cards[index])) {
                lista.push(cards[index])
            }
        }
        return lista
    },
}

