new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player give damage for Monster -' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 25);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player using SPECIAL ATTACK to Monster for -' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 75) {
                this.playerHealth += 25;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player using HEALS + 25'
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            if (confirm('ARE YOU SURE WANNA GIVE UP?')) {
                this.gameIsRunning = false;
            }
            return true;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 20);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster give damage for Player -' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('YOU WIN!, NEW GAME?')) {
                    this.startGame();
                    } else {
                        this.gameIsRunning = false;
                    }
                    return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('YOU LOST!, NEW GAME?')) {
                    this.startGame();
                    } else {
                        this.gameIsRunning = false;
                    }
                    return true;
                }
            return false;
        }
    }
});