class NilaiSentral {
  data: number[];
  constructor(data: number[]) {
    this.data = data;
  }

  Rata() {
    let sum = 0;
    for (let i = 0; i < this.data.length; i++) {
      const el = this.data[i];
      sum += el;
    }
    let rata_rata = sum / this.data.length;
    return rata_rata.toFixed(4);
  }
  median() {
    let newData = this.data.sort();
    let result = 0;
    if (this.data.length % 2 === 0) {
      let data1 = this.data.length / 2;
      let data2 = this.data.length / 2 + 1;
      result = newData[data2 - 1] - newData[data1 - 1];
    } else {
      console.log("ganjil");
    }
    console.log(result);
  }
  //   Kuartil() {}
  //   Desil() {}
  //   Persentil() {}
}

const nilaiSentral = new NilaiSentral([
  12, 15, 16, 20, 21, 23, 24, 25, 26, 30, 32, 34,
]);

// console.log(nilaiSentral.Rata());
// console.log(nilaiSentral.median());
nilaiSentral.median();
