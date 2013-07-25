////////////////////////////////////////////////////////////////////
// (JS)
// CLASS COMPUTA VALOR/CAPITAL, JUROS E MONTANTE
// AUTOR: VALDINEY FRANÇA
//
///////////////////////////////////////////////////////////////////
window.onload = function(){
    function mostraDadosStorage(msg){
        var div_relatorioStorage = document.getElementById('div_relatorioStorage'),
          resgata_relatorio = localStorage.getItem('relatorio');

        if(resgata_relatorio == null){
            return div_relatorioStorage.innerHTML = ' Não tem nenhum relátorio gravado ainda...';
        }else{
           return div_relatorioStorage.innerHTML = '<h3>' + msg + '</h3>' + '<br>' + resgata_relatorio;
        }
    }

    mostraDadosStorage('Relatório anterior:');
    /////////////////////////////////////////////////////////////// 

    document.getElementById('computar_renda').onclick = function(){

        //////////////////////////////////////////////////////////////////
        //RESGATA OS CAMPOS DE ENTRADA DE DADOS E O DE SAIDA VIA ID

        var capital = Number(document.getElementById('capital').value),
            meses= Number(document.getElementById('meses').value),
            juros = Number(document.getElementById('juros').value),
            mostrar_resultado = document.getElementById('resultado_renda'),
            div_relatorio = document.getElementById('div_relatorio');

        /////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////
        //CONSTRUÇÃO DA CLASS/FUNÇÃO CONSTRUTORA COM SEUS ATRIBUTOS E METODOS

        function Renda(capital,meses,juros){
            this.capital = capital;
            this.meses = meses;
            this.juros = juros;

            this.calculaPorcentagem = function(){
                oCalcular = this.capital * this.juros / 100;
                return oCalcular.toFixed(2);
            };

            this.calcularRendaAomes = function(){
                oCalcular = this.calculaPorcentagem() * this.meses;
                return oCalcular.toFixed(2);
            };

            this.calcularMontante = function(){
                oCalcular = this.capital + parseFloat(this.calcularRendaAomes());
                return oCalcular.toFixed(2);
            };
            ////////////////////////////////////////////////////////////
            //RELATÓRIO DE PROCESSAMENTO
            this.relatorioDeProcessamento = function(){
                var oMostrar;

                oMostrar = ' <b>Capital</b> = ' + this.capital + '| <b>meses =</b> ' + this.meses + '| <b>juros =</b> ' + this.juros;
                oMostrar += oProcesso_porcent = '<br><b>Calculando a porcentagem:</b> ( capital * juros / 100) = ' + this.calculaPorcentagem();
                oMostrar += oProcessoAoMes = ' <br><b>Calculando juros ao mes:</b> ( ' + this.calculaPorcentagem() + ' * meses ) = ' + this.calcularRendaAomes();
                oMostrar += oMontante = ' <br><b>Calculo do montante:</b> ( ' + this.capital + ' + ' + this.calcularRendaAomes() + ' ) = ' + this.calcularMontante();
                return oMostrar;
            };
        }//END CLASS 

        ////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////
        //INSTANCIANDO O OBJETO CRIADO ATRAVEZ DA CLASS (RENDA)

        primeiraRenda = new Renda(capital,meses,juros);
        ///////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////
        //FUNÇÃO VALIDA OS CAMPOS DE ENTRADA ATRAVEZ DE CONDICIONAIS

        function validar(capital){
            if(capital==''){
                mostrar_resultado.innerHTML = '<p>Digite um valor para ser computado...</p>';
            }else if(isNaN(capital)){
                mostrar_resultado.innerHTML = '<p>Digite apenas valores numericos...</p>';
            }else{
                mostrar_resultado.innerHTML = '<b>Porcentagem de:</b> '+primeiraRenda.calculaPorcentagem()+'<br>'+'<b>Renda por Mês de:</b> '+primeiraRenda.calcularRendaAomes()+'<br>'+'<b>O seu montante é de:</b> '+primeiraRenda.calcularMontante();
                div_relatorio.innerHTML = primeiraRenda.relatorioDeProcessamento();

                ///////////////////////////////////////////////
                // FUNÇÃO GRAVA NO LOCAL STORAGE O RELATÓRIO DE PROCESSAMENTO
                //////////////////////////////////////////////
                function gravaNoStorage(){
                    localStorage.setItem('relatorio',div_relatorio.innerHTML);
                }

                gravaNoStorage();

            }//END ELSE
        }//END FUNCTION

        /////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////
        //CHAMANDO A FUNÇÃO (VALIDAR)
        validar(capital);

    }; //END RENDA COMPUTAR
}//END WINDOW