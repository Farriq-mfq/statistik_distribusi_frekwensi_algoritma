class DisFre {
  datas: number[];
  constructor(data: number[]) {
    this.datas = data;
  }
  range(): number {
    let minimalData = Math.min(...this.datas);
    let maximalData = Math.max(...this.datas);
    return Number(maximalData) - Number(minimalData);
  }
  rowClass(): number {
    const totaldata: number = this.datas.length;
    function log(value): number {
      return Math.log(value) / Math.LN10;
    }
    return Math.round(1 + 3.322 * log(totaldata));
  }
  interval(): number {
    return Math.round(this.range() / this.rowClass());
  }
  jangkauan(): number[] {
    let dataJangkauan = [];
    let jangkau = Math.min(...this.datas);
    for (let i = 0; i < this.rowClass(); i++) {
      if (i != 0) {
        jangkau += this.interval();
      }
      dataJangkauan.push([jangkau, jangkau + this.interval() - 1]);
    }
    return dataJangkauan;
  }
  frekwensi(): number[] {
    let dataFrek = [];
    let sum = [];
    for (let i = 0; i < this.jangkauan().length; i++) {
      let count = [];
      for (let j = this.jangkauan()[i][0]; j <= this.jangkauan()[i][1]; j++) {
        count.push(this.datas.filter((data) => data === j));
      }
      dataFrek.push(count);
    }
    for (let k = 0; k < dataFrek.length; k++) {
      const frek = dataFrek[k];
      let frekfilter = frek.filter((freks) => freks.length);
      let flat = [];
      for (let l = 0; l < frekfilter.length; l++) {
        const freks = frekfilter[l];
        flat.push(...freks);
      }
      sum.push(flat.length);
    }
    return sum;
  }
  totalFrekwensi(): number {
    let total = 0;
    for (let i = 0; i < this.frekwensi().length; i++) {
      const frek__ = this.frekwensi()[i];
      total += frek__;
    }
    return total;
  }
  TepiAtas(): number[] {
    let tepiAtas = [];
    for (let i = 0; i < this.jangkauan().length; i++) {
      let batasAtas = this.jangkauan()[i][1];
      tepiAtas.push(batasAtas + 0.5);
    }
    return tepiAtas;
  }
  TepiBawah(): number[] {
    let tepiBawah = [];
    for (let i = 0; i < this.jangkauan().length; i++) {
      let batasBawah = this.jangkauan()[i][0];
      tepiBawah.push(batasBawah - 0.5);
    }
    return tepiBawah;
  }
  frekwensiKumulatifKurangDari(): number[] {
    let num = 0;
    let fk_krg = [];
    for (let i = 0; i < this.frekwensi().length; i++) {
      let frekwensi = this.frekwensi()[i];
      num += frekwensi;
      fk_krg.push(num);
    }
    return fk_krg;
  }
  frekwensiKumulatifLebihDari(): number[] {
    let num = this.totalFrekwensi();
    let newfrek = [0].concat(this.frekwensi());
    let fk_lbh: number[] = [];
    for (let i = 0; i < newfrek.length; i++) {
      num -= newfrek[i];
      if (fk_lbh.length != this.frekwensi().length) {
        fk_lbh.push(num);
      }
    }
    return fk_lbh;
  }
  frekwensiRelatif(isPersen: boolean = false): any[] {
    let data = [];
    for (let i = 0; i < this.frekwensi().length; i++) {
      const frek = this.frekwensi()[i];
      if (isPersen) {
        data.push(`${Math.round((frek / this.totalFrekwensi()) * 100)}%`);
      } else {
        data.push(Math.round((frek / this.totalFrekwensi()) * 100));
      }
    }
    return data;
  }
  nilaiTengah(): number[] {
    let result = [];
    for (let i = 0; i < this.jangkauan().length; i++) {
      const jangkau = this.jangkauan()[i];
      result.push((jangkau[0] + jangkau[1]) / 2);
    }
    return result;
  }
  getOgiveFkKurangDari(): any[] {
    let res = [];
    for (let j = 0; j < this.frekwensiKumulatifKurangDari().length; j++) {
      const fk_ = this.frekwensiKumulatifKurangDari()[j];
      res.push(Math.round((fk_ / this.totalFrekwensi()) * 100));
    }
    let json = JSON.stringify({
      percentage: res,
      fk: this.frekwensiKumulatifKurangDari(),
      tepi_bawah: this.TepiBawah(),
    });

    return JSON.parse(json);
  }
  getOgiveFkLebihDari(): any[] {
    let res = [];
    for (let j = 0; j < this.frekwensiKumulatifLebihDari().length; j++) {
      const fk_ = this.frekwensiKumulatifLebihDari()[j];
      res.push(Math.round((fk_ / this.totalFrekwensi()) * 100));
    }
    let json = JSON.stringify({
      percentage: res,
      fk: this.frekwensiKumulatifLebihDari(),
    });

    return JSON.parse(json);
  }
  getGrafikPoligon(): any[] {
    let json = JSON.stringify({
      nilaiTengah: this.nilaiTengah(),
      frekwensi: this.frekwensi(),
    });

    return JSON.parse(json);
  }
  getAll(): any[] {
    let arr = [];
    for (let i = 0; i < this.rowClass(); i++) {
      arr.push({
        jangkauan: this.jangkauan()[i],
        frekwensi: this.frekwensi()[i],
        tepi_atas: this.TepiAtas()[i],
        tepi_bawah: this.TepiBawah()[i],
        xi: this.nilaiTengah()[i],
        fk_kurang_dari: this.frekwensiKumulatifKurangDari()[i],
        fk_lebih_dari: this.frekwensiKumulatifLebihDari()[i],
        frekwensi_relative: this.frekwensiRelatif(true)[i],
      });
    }
    return arr;
  }
}

// example data
const Dis_Fre = new DisFre([
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
