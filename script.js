class Kalkulator {
    constructor(teksOperandSebelumnya, teksOperandTerkini) {
        this.teksOperandSebelumnya = teksOperandSebelumnya
        this.teksOperandTerkini = teksOperandTerkini
        this.hapusSemua()
    }

    hapusSemua() {
        this.operandTerkini = ''
        this.operandSebelumnya = ''
        this.operator = undefined
    }

    hapus() {
        this.operandTerkini = this.operandTerkini.toString().slice(0, -1)

    }

    tambahBilangan(bilangan) {
        if (bilangan === '.' && this.operandTerkini.includes('.')) return
        this.operandTerkini = this.operandTerkini.toString() + bilangan.toString()
    }

    pilihOperator(operator) {
        if (this.operandTerkini === '') return
        if (this.operandSebelumnya !== '') {
            this.hitung()
        }
        this.operator = operator
        this.operandSebelumnya = this.operandTerkini
        this.operandTerkini = ''
    }

    hitung() {
        let penghitungan
        const prev = parseFloat(this.operandSebelumnya)
        const current = parseFloat(this.operandTerkini)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operator) {
            case'+':
             penghitungan = prev + current
             break
            case'-':
             penghitungan = prev - current
            break
             case'*':
             penghitungan = prev * current
             break
            case'÷':
             penghitungan = prev / current
             break
            default:
             return
        }
        this.operandTerkini = penghitungan
        this.operator = undefined
        this.operandSebelumnya = ''
    }

    getTampilanBilangan(bilangan) {
        const bilanganString = bilangan.toString()
        const bilanganInteger = parseFloat(bilanganString.split('.')[0])
        const bilanganDesimal = bilanganString.split('.')[1]
        let tampilanInteger
        if (isNaN(bilanganInteger)) {
            tampilanInteger = ''
        } else {
            tampilanInteger = bilanganInteger.toLocaleString('id', {maximumFractionDigits: 0})
        }
        if (bilanganDesimal != null) {
            return `${tampilanInteger}.${bilanganDesimal}`
        } else {
            return tampilanInteger
        }
    }

    perbaruTampilan() {
        this.teksOperandTerkini.innerText = this.getTampilanBilangan(this.operandTerkini)
        if (this.operator != null) {
            this.teksOperandSebelumnya.innerText =
              `${this.getTampilanBilangan(this.operandSebelumnya)} ${this.operator}`
        }else {
            this.teksOperandSebelumnya.innerText = ''
        }
    }
}

const tombolBilangan = document.querySelectorAll('[data-nomor]')
const tombolOperator = document.querySelectorAll('[data-operator]')
const tombolSamaDengan = document.querySelector('[data-sama-dengan]')
const tombolHapus = document.querySelector('[data-hapus]')
const tombolHapusSemua = document.querySelector('[data-hapus-semua]')
const teksOperandSebelumnya = document.querySelector('[data-operand-sebelumnya]')
const teksOperandTerkini = document.querySelector('[data-operand-terkini]')

const kalkulator = new Kalkulator(teksOperandSebelumnya, teksOperandTerkini)

tombolBilangan.forEach(tombol => {
    tombol.addEventListener('click', () => {
        kalkulator.tambahBilangan(tombol.innerText)
        kalkulator.perbaruTampilan()
  })
})

tombolOperator.forEach(tombol => {
    tombol.addEventListener('click', () => {
        kalkulator.pilihOperator(tombol.innerText)
        kalkulator.perbaruTampilan()
  })
})

tombolSamaDengan.addEventListener('click', () => {
    kalkulator.hitung()
    kalkulator.perbaruTampilan()
})

tombolHapusSemua.addEventListener('click', () => {
    kalkulator.hapusSemua()
    kalkulator.perbaruTampilan()
})

tombolHapus.addEventListener('click', () => {
    kalkulator.hapus()
    kalkulator.perbaruTampilan()
})










