var DisFre = /** @class */ (function () {
    function DisFre(data) {
        this.datas = data;
    }
    DisFre.prototype.range = function () {
        var minimalData = Math.min.apply(Math, this.datas);
        var maximalData = Math.max.apply(Math, this.datas);
        return Number(maximalData) - Number(minimalData);
    };
    DisFre.prototype.rowClass = function () {
        var totaldata = this.datas.length;
        function log(value) {
            return Math.log(value) / Math.LN10;
        }
        return Math.round(1 + 3.322 * log(totaldata));
    };
    DisFre.prototype.interval = function () {
        return Math.round(this.range() / this.rowClass());
    };
    DisFre.prototype.jangkauan = function () {
        var dataJangkauan = [];
        var jangkau = Math.min.apply(Math, this.datas);
        for (var i = 0; i < this.rowClass(); i++) {
            if (i != 0) {
                jangkau += this.interval();
            }
            dataJangkauan.push([jangkau, jangkau + this.interval() - 1]);
        }
        return dataJangkauan;
    };
    DisFre.prototype.frekwensi = function () {
        var dataFrek = [];
        var sum = [];
        for (var i = 0; i < this.jangkauan().length; i++) {
            var count = [];
            var _loop_1 = function (j) {
                count.push(this_1.datas.filter(function (data) { return data === j; }));
            };
            var this_1 = this;
            for (var j = this.jangkauan()[i][0]; j <= this.jangkauan()[i][1]; j++) {
                _loop_1(j);
            }
            dataFrek.push(count);
        }
        for (var k = 0; k < dataFrek.length; k++) {
            var frek = dataFrek[k];
            var frekfilter = frek.filter(function (freks) { return freks.length; });
            var flat = [];
            for (var l = 0; l < frekfilter.length; l++) {
                var freks = frekfilter[l];
                flat.push.apply(flat, freks);
            }
            sum.push(flat.length);
        }
        return sum;
    };
    DisFre.prototype.totalFrekwensi = function () {
        var total = 0;
        for (var i = 0; i < this.frekwensi().length; i++) {
            var frek__ = this.frekwensi()[i];
            total += frek__;
        }
        return total;
    };
    DisFre.prototype.TepiAtas = function () {
        var tepiAtas = [];
        for (var i = 0; i < this.jangkauan().length; i++) {
            var batasAtas = this.jangkauan()[i][1];
            tepiAtas.push(batasAtas + 0.5);
        }
        return tepiAtas;
    };
    DisFre.prototype.TepiBawah = function () {
        var tepiBawah = [];
        for (var i = 0; i < this.jangkauan().length; i++) {
            var batasBawah = this.jangkauan()[i][0];
            tepiBawah.push(batasBawah - 0.5);
        }
        return tepiBawah;
    };
    DisFre.prototype.frekwensiKumulatifKurangDari = function () {
        var num = 0;
        var fk_krg = [];
        for (var i = 0; i < this.frekwensi().length; i++) {
            var frekwensi = this.frekwensi()[i];
            num += frekwensi;
            fk_krg.push(num);
        }
        return fk_krg;
    };
    DisFre.prototype.frekwensiKumulatifLebihDari = function () {
        var num = this.totalFrekwensi();
        var newfrek = [0].concat(this.frekwensi());
        var fk_lbh = [];
        for (var i = 0; i < newfrek.length; i++) {
            num -= newfrek[i];
            if (fk_lbh.length != this.frekwensi().length) {
                fk_lbh.push(num);
            }
        }
        return fk_lbh;
    };
    DisFre.prototype.frekwensiRelatif = function (isPersen) {
        if (isPersen === void 0) { isPersen = false; }
        var data = [];
        for (var i = 0; i < this.frekwensi().length; i++) {
            var frek = this.frekwensi()[i];
            if (isPersen) {
                data.push("".concat(Math.round((frek / this.totalFrekwensi()) * 100), "%"));
            }
            else {
                data.push(Math.round((frek / this.totalFrekwensi()) * 100));
            }
        }
        return data;
    };
    DisFre.prototype.nilaiTengah = function () {
        var result = [];
        for (var i = 0; i < this.jangkauan().length; i++) {
            var jangkau = this.jangkauan()[i];
            result.push((jangkau[0] + jangkau[1]) / 2);
        }
        return result;
    };
    DisFre.prototype.getOgiveFkKurangDari = function () {
        var res = [];
        for (var j = 0; j < this.frekwensiKumulatifKurangDari().length; j++) {
            var fk_ = this.frekwensiKumulatifKurangDari()[j];
            res.push(Math.round((fk_ / this.totalFrekwensi()) * 100));
        }
        var json = JSON.stringify({
            percentage: res,
            fk: this.frekwensiKumulatifKurangDari(),
            tepi_bawah: this.TepiBawah()
        });
        return JSON.parse(json);
    };
    DisFre.prototype.getOgiveFkLebihDari = function () {
        var res = [];
        for (var j = 0; j < this.frekwensiKumulatifLebihDari().length; j++) {
            var fk_ = this.frekwensiKumulatifLebihDari()[j];
            res.push(Math.round((fk_ / this.totalFrekwensi()) * 100));
        }
        var json = JSON.stringify({
            percentage: res,
            fk: this.frekwensiKumulatifLebihDari()
        });
        return JSON.parse(json);
    };
    DisFre.prototype.getGrafikPoligon = function () {
        var json = JSON.stringify({
            nilaiTengah: this.nilaiTengah(),
            frekwensi: this.frekwensi()
        });
        return JSON.parse(json);
    };
    DisFre.prototype.getAll = function () {
        var arr = [];
        for (var i = 0; i < this.rowClass(); i++) {
            arr.push({
                jangkauan: this.jangkauan()[i],
                frekwensi: this.frekwensi()[i],
                tepi_atas: this.TepiAtas()[i],
                tepi_bawah: this.TepiBawah()[i],
                xi: this.nilaiTengah()[i],
                fk_kurang_dari: this.frekwensiKumulatifKurangDari()[i],
                fk_lebih_dari: this.frekwensiKumulatifLebihDari()[i],
                frekwensi_relative: this.frekwensiRelatif(true)[i]
            });
        }
        return arr;
    };
    return DisFre;
}());
// example data
var Dis_Fre = new DisFre([
    73, 84, 40, 25, 63, 65, 46, 38, 57, 50, 60, 30, 82, 72, 29, 62, 54, 56, 51,
    55, 39, 38, 33, 18, 16, 41, 71, 80, 58, 54, 26, 47, 52, 37, 73, 45, 62, 51,
    64, 61, 40, 43, 22, 31, 36, 70, 53, 23, 52, 76,
]);
// console.log(Dis_Fre.getAll());
// // console.log(Dis_Fre.totalFrekwensi());
// // console.log(Dis_Fre.range());
// // console.log(Dis_Fre.rowClass());
// // console.log(Dis_Fre.interval());
// // console.log(Dis_Fre.jangkauan());
// console.log(Dis_Fre.frekwensi());
// // console.log(Dis_Fre.TepiBawah());
// // console.log(Dis_Fre.TepiAtas());
