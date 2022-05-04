var NilaiSentral = /** @class */ (function () {
    function NilaiSentral(data) {
        this.data = data;
    }
    NilaiSentral.prototype.Rata = function () {
        var sum = 0;
        for (var i = 0; i < this.data.length; i++) {
            var el = this.data[i];
            sum += el;
        }
        var rata_rata = sum / this.data.length;
        return rata_rata.toFixed(4);
    };
    NilaiSentral.prototype.median = function () {
        var newData = this.data.sort();
        var result = 0;
        if (this.data.length % 2 === 0) {
            var data1 = this.data.length / 2;
            var data2 = this.data.length / 2 + 1;
            result = newData[data2 - 1] - newData[data1 - 1];
        }
        else {
            console.log("ganjil");
        }
        console.log(result);
    };
    return NilaiSentral;
}());
var nilaiSentral = new NilaiSentral([
    12, 15, 16, 20, 21, 23, 24, 25, 26, 30, 32, 34,
]);
// console.log(nilaiSentral.Rata());
// console.log(nilaiSentral.median());
nilaiSentral.median();
