
// Passando o elemento Form para uma variável
var form = document.getElementById('form');

form.addEventListener('submit', function (event) {
    event.preventDefault()

    // Para formatar data customizada utilizando o Intl.DateTimeFormat()
    const formatter = Intl.DateTimeFormat("en-US", {
        //weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    // Obtendo o valor de Minutos do Minimum GT - formato string 
    var mgt = document.getElementById('groundTimeInput').value
    //mgt = Number(mgt);
    console.log(mgt);

    // Obtendo o valor do elemento passado pelo usuário em STD     
    var std = document.getElementById('stdInput').value
    console.log(new Date(std));

    // Obtendo o valor do elemento passado pelo usuário em ATA
    var ata = document.getElementById('ataInput').value

    // Obtendo o valor do elemento passado pelo usuário em ATD    
    var atd = document.getElementById('atdInput').value
    //console.log(atd);

    // Devolve o valor calculado de Target Time Departure pela formula ATA + MGT
    var ttd_convert = new Date(ata);
    ttd_convert = ttd_convert.setMinutes(ttd_convert.getMinutes() + Number(mgt));
    document.getElementById("ttdDisplay").innerHTML = formatter.format(new Date(ttd_convert));

    // Calcula o Valor do Delay RA
    var ataMin = new Date(ata);
    ataMin = ataMin.setMinutes(ataMin.getMinutes());
    console.log(ataMin);
    var stdMin = new Date(std);
    stdMin = stdMin.setMinutes(stdMin.getMinutes());
    console.log(stdMin);
    var staMin = new Date(std);
    staMin = staMin.setMinutes(staMin.getMinutes() - Number(mgt));
    console.log("STA min:" + staMin)
    var RA = (ataMin - staMin) / 60000;
    
    // Se RA menor que Zero, RA passa a ser Zero (sem atraso)
    if (RA < 0) {
        RA = 0;
        ttd_convert = new Date(std);
        ttd_convert = ttd_convert.setMinutes(ttd_convert.getMinutes());
        document.getElementById("ttdDisplay").innerHTML = formatter.format(new Date(ttd_convert));
        document.getElementById("minutesBoxRA").innerHTML = "N/A";
    } else {
        document.getElementById("minutesBoxRA").innerHTML = RA;
    };

    // Calcula o Valor de Total Delay Time
    var atdMin = new Date(atd);
    atdMin = atdMin.setMinutes(atdMin.getMinutes());
    var totalDelay = ((atdMin - ttd_convert) / 60000) + RA;
    document.getElementById("minutesBoxTD").innerHTML = totalDelay;
    console.log(totalDelay);

    // Calcula o valor de Delay Distribution 
    var delayDist = totalDelay - RA;
    document.getElementById("minutesBoxDD").innerHTML = delayDist;

    /* Limpa os input fields ref. distribuição de Delay e seta os campos
    sob o evento onchange de disabled true para false */
    document.getElementById("min01").disabled = false;
    document.getElementById("min01").value = '';
    document.getElementById("min02").disabled = false;
    document.getElementById("min02").value = '';
    document.getElementById("min03").disabled = false;
    document.getElementById("min03").value = '';
    document.getElementById("min04").disabled = false;
    document.getElementById("min04").value = '';
    document.getElementById("min05").disabled = false;
    document.getElementById("min05").value = '';
    document.getElementById("min06").disabled = false;
    document.getElementById("min06").value = '';
}) // Fim da programação do botão


/* Valida o input box ref Minimum GT para não receber valores negativos e maiores
que 4 caracteres numericos com o evento oninput */
document.getElementById("groundTimeInput").oninput = function CharLimit() {

    var mgtCharLimit = document.getElementById("groundTimeInput").value;

    if (mgtCharLimit < 0 || mgtCharLimit > 9999) {
        alert('Negative Values or > 9999 not Allowed!');
        document.getElementById("groundTimeInput").value = '';
    }
}

// Configurando os seis input box ref. delay Distribution 
// Evento onchange nos inputs de distribuição de minutos
// Se minutos distribuidos < 0 ou maiores que 9999 retorna ALERT e Reseta o field
// Calcula os Minutes Left a cada distribuição de Delay Minutes
// Se Minutes Left < 0 retorna ALERT

// Input box Delay Dist 01
document.getElementById("min01").onchange = function MinLeft01() {

    var ml01 = document.getElementById("min01").value;
    
    if (ml01 < 0 || ml01 > 9999) {
        alert('Negative Values or > 9999 not Allowed!');
        document.getElementById("min01").value = '';
    } else {
        var RAUpdate = document.getElementById("minutesBoxDD").textContent;     
        RAUpdate = RAUpdate - ml01;
        
        if (RAUpdate < 0) {
            alert('Wrong Delay Distribution!')
        } else {
            document.getElementById("min01").disabled = true;
            return document.getElementById("minutesBoxDD").innerHTML = RAUpdate;
        }
    }
};

// Input box Delay Dist 02
document.getElementById("min02").onchange = function MinLeft02() {

    var ml02 = document.getElementById("min02").value;

    if (ml02 < 0 || ml02 > 9999) {
        alert('Negative Values or > 9999 not Allowed!');
        document.getElementById("min02").value = '';
    } else {
        var RAUpdate = document.getElementById("minutesBoxDD").textContent;
        RAUpdate = RAUpdate - ml02;
        
        if (RAUpdate < 0) {
            alert('Wrong Delay Distribution!');
        } else {
            document.getElementById("min02").disabled = true;
            return document.getElementById("minutesBoxDD").innerHTML = RAUpdate;
        }
    }
};

// Input box Delay Dist 03
document.getElementById("min03").onchange = function MinLeft03() {
   
    var ml03 = document.getElementById("min03").value;

    if (ml03 < 0 || ml03 > 9999) {
        alert('Negative Values or > 9999 not Allowed!');
        document.getElementById("min03").value = '';
    } else {
        var RAUpdate = document.getElementById("minutesBoxDD").textContent;
        RAUpdate = RAUpdate - ml03;
        
        if (RAUpdate < 0) {
            alert('Wrong Delay Distribution!');
        } else {
            document.getElementById("min03").disabled = true;
            return document.getElementById("minutesBoxDD").innerHTML = RAUpdate;
        }
    }
};

// Input box Delay Dist 04
document.getElementById("min04").onchange = function MinLeft04() {
    
    var ml04 = document.getElementById("min04").value;

    if (ml04 < 0 || ml04 > 9999) {
        alert('Negative Values or > 9999 not Allowed!');
        document.getElementById("min04").value = '';
    } else {
        var RAUpdate = document.getElementById("minutesBoxDD").textContent;
        RAUpdate = RAUpdate - ml04;
        
        if (RAUpdate < 0) {
            alert('Wrong Delay Distribution!');
        } else {
            document.getElementById("min04").disabled = true;
            return document.getElementById("minutesBoxDD").innerHTML = RAUpdate;
        }
    }
};

// Input box Delay Dist 05
document.getElementById("min05").onchange = function MinLeft05() {
        
    var ml05 = document.getElementById("min05").value;

    if (ml05 < 0 || ml05 > 9999) {
        alert('Negative Values or > 9999 not Allowed!');
        document.getElementById("min05").value = '';
    } else {
        var RAUpdate = document.getElementById("minutesBoxDD").textContent;
        RAUpdate = RAUpdate - ml05;
        
        if (RAUpdate < 0) {
            alert('Wrong Delay Distribution!');
        } else {
            document.getElementById("min05").disabled = true;
            return document.getElementById("minutesBoxDD").innerHTML = RAUpdate;
        }
    }
};

// Input box Delay Dist 06
document.getElementById("min06").onchange = function MinLeft06() {
        
    var ml06 = document.getElementById("min06").value;

    if (ml06 < 0 || ml06 > 9999) {
        alert('Negative Values or > 9999 not Allowed!');
        document.getElementById("min06").value = '';
    } else {
        var RAUpdate = document.getElementById("minutesBoxDD").textContent;
        RAUpdate = RAUpdate - ml06;
        
        if (RAUpdate < 0) {
            alert('Wrong Delay Distribution!');
        } else {
            document.getElementById("min06").disabled = true;
            return document.getElementById("minutesBoxDD").innerHTML = RAUpdate;
        }
    }
};
