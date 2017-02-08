Vue.filter('doneLabel', function (value){
    if(value == 0){
        return "Não";
    }else{
        return "Sim";
    }
});

Vue.filter('statusGeneral', function (value, type){
    var txt1 = '';
    var txt2 = '';

    if(type === 'pay'){
        var txt1 = 'pagar';
        var txt2 = 'pagas';
    }else if(type === 'receive'){
        var txt1 = 'receber';
        var txt2 = 'recebidas';
    }
    if(value === false){
        return '<span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Nenhuma conta cadastrada';
    }
    if(!value){
        return '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span> Nenhuma conta a ' + txt1;
    }else{
        return '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span> Existem <strong>' + value + '</strong> contas a serem ' + txt2;
    }
});

Vue.filter('currency', function (value, locale = 'pt-br'){
    // numeral.js basic config
    numeral.locale(locale);
    numeral.defaultFormat('$0,0.00[00]');

    return numeral(value).format();
});