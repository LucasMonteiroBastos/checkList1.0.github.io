<template>
  <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="null" finishButtonText="Enviar" @on-complete="openLoading">
    <tab-content title="Matricula" class="mb-5" icon="feather icon-home":step="1">

      <div class="vvx-col w-full">
        <vs-list-item title="Para Iniciar seu check in digite sua matrícula"></vs-list-item>
      </div>
      <br>
      <!-- tab 1 content Dados Matricula-->
      <form data-vv-scope="step-1" @submit.prevent="">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-5">
            <v-text-field
              label="Sua Matricula"
              @blur="getMatricula"
              v-model="answer.matricula"
              v-mask="'###-######'"
              :Loading="isLoading"
              :rules="rules.required"
              class="w-full">
            </v-text-field>
          </div>
          <v-row class="px-3">
            <v-spacer></v-spacer>
          </v-row>
        </div>
      </form>
    </tab-content>
    <!-- tab 2 content Dados -->
    <tab-content title="Step 2" class="mb-5" icon="feather icon-briefcase" >
      <form data-vv-scope="step-2":step="2"@submit.prevent="">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full">
            <vs-list>
              <vs-list-item title="Nome" :subtitle="answer.nome"></vs-list-item>
              <vs-list-item title="Curso" :subtitle="answer.curso"></vs-list-item>
              <vs-list-item title="Periodo" :subtitle="answer.periodo"></vs-list-item>
            </vs-list>
          </div>
        </div>
      </form>
        <div class="vx-col md:w-1/2 w-full mt-5">
          <v-checkbox dense
                      v-model="aceite"
                      :rules="rules.required"
                      color="#9288F3"
                      label="Aceito"
                      messages="Confirmo os meus dados acima">
          </v-checkbox>
        </div>
    </tab-content>
    <!-- tab 3 content Sintomas -->
    <tab-content title="Step 3" class="mb-5" icon="feather icon-image">
      <form data-vv-scope="step-3">
      <div class="vx-row">
        <div class="vx-col md:w-1/2 w-full">
          <div class="vx-col md:w-1/2 w-full mt-5"><spam>Está com algum sintoma?</spam></div>
          <ul class="cool-3">
            <br/>

            <div class="vx-col md:w-1/2 w-full mt-5">
              <v-checkbox dense
                   :rules="rulesCheckbox(answer.sintomas)"
                   on-icon="mdi-check"
                   :loading="isLoading"
                   v-model="answer.sintomas"
                   v-for="sintoma in sintomas"
                   :label="sintoma.descricao"
                   color="#9288F3"
                   :value="sintoma.id"/>

              <v-checkbox
                v-model="sem_sintomas"
                label="Sem Sitoma"
                :rules="rulesCheckbox(sem_sintomas)">
              </v-checkbox>

            </div>
          </ul>
        </div>
      </div>
      </form>
    </tab-content>
    <!-- tab 3 content -->
    <vs-popup
      class="holamundo"
      title="Status"
      :active.sync="popupGreen" >

      <h4 style="text-align: center">CheckList Concluído</h4>
      <vs-divider/>
      <vs-avatar size="large" color="success" icon="whatshot" style="margin-left: 42%;margin-bottom: 7%" />

      <p style="padding-bottom: 20px; text-align: center;">QR Code gerado com sucesso para o aluno <b>{{ this.nome_aluno_check }}</b> da matrícula <br/><b>{{ this.matricula_aluno_check }}</b> no dia {{ this.datacriada }}.</p>
      <qrcode-vue
        :value="this.id_aluno_check + this.nome_aluno_check +texto+ this.matricula_aluno_check"
        :size=220
        level="H"
        style="
          justify-content: center;
          display: flex;
          ">
      </qrcode-vue>


      <p style="padding-top: 20px; text-align: center;"><b>Apresente seu QR Code a portaria da UNDB!</b></p>

    </vs-popup>

    <vs-popup
      class="holamundo"
      title="Status"
      :active.sync="popupNaoMatriculado" >

      <h4 style="text-align: center">Informação</h4>
      <vs-divider/>
      <vs-avatar size="large" color="success" icon="filter_vintage" style="margin-left: 42%;margin-bottom: 7%" />

      <p style="padding-bottom: 20px; text-align: center;">Aluno <b>{{ answer.nome }}</b> da matrícula <br/><b>{{ answer.matricula}}</b> não esta matriculado.</p>


      <p style="padding-top: 20px; text-align: center;"><b>Por Favor verifique sua situação junto a instituição!</b></p>

    </vs-popup>

    <vs-popup
      class="holamundo"
      title="Status"
      :active.sync="popupsintomacovid" >

      <h4 style="text-align: center">Informação</h4>
      <vs-divider/>
      <vs-avatar size="large" color="success" icon="filter_vintage" style="margin-left: 42%;margin-bottom: 7%" />

      <p style="padding-bottom: 20px; text-align: center;">Aluno <b>{{ answer.nome }}</b> da matrícula <br/><b>{{ answer.matricula}}</b> é recomendavel que fique em casa por 14 dias de acordo com as recomendações das autoridades de saude.</p>


      <p style="padding-top: 20px; text-align: center;"><b>Pof favor acompanhe as aulas pelo classrom</b></p>

    </vs-popup>

        <vs-popup
      class="holamundo"
      title="Status"
      :active.sync="popupa24horas" >

      <h4 style="text-align: center">Informação</h4>
      <vs-divider/>
      <vs-avatar size="large" color="warning" icon="filter_vintage" style="margin-left: 42%;margin-bottom: 7%" />

      <p style="padding-bottom: 20px; text-align: center;">Aluno <b>{{ answer.nome }}</b> da matrícula <br/><b>{{ answer.matricula}}</b> Avaliação ja foi realizada hoje.</p>


      <p style="padding-top: 20px; text-align: center;"><b>Aguarde até o proximo dia</b></p>

    </vs-popup>
  </form-wizard>

</template>

<script>
//Acredito que vcs devem includo dessaa forma aqui no import
//vcs esto instal via npm?sim
// roda ai npm install moment --save
  import moment from 'moment'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import QrcodeVue from 'qrcode.vue'
  import Loading from "vue-loading-overlay";


  function toTimestamp(criado_em) {
    var datum = Date.parse(criado_em);
    return datum/1000;
  }

  function dataAtualFormatada(criado_em){
    var data = new Date(criado_em),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0'+mes : mes,
      anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }

  function setProxRecomendacao(){
    var data = new Date();
    var d = moment(data)
    d = d.add(14,'days')
    d = d.format('YYYY-MM-DD')
    console.log(d)
    return d
  }

  export default {
    data() {
      return {
        dadosqrcode:[this.nome_aluno_check, this.matricula_aluno_check, this.id_aluno],
        firstName: "",
        size: 250,
        altLabels: true,
        editable: false,
        defaultHeight:'400px',
        popupGreen: false,
        popupa24horas:false,
        sem_sintomas:false,
        popupsintomacovid:false,
        texto:" com a matricula ",
        el: 1,
        alert_message: '',
        sintomas: [],
        prox_recomendacao:[],
        informacaoes: [],
        check:[],
        checkin:null,
        datacriada:null,
        datahoje:null,
        resultdata:null,
        nome_aluno_check:null,
        matricula_aluno_check:null,
        sintomas_aluno:null,
        id_aluno_check:0,

        answer:{
          sintomas:[],
          matricula:null,
          nome:null,
          codcurso:null,
          curso:null,
          periodo:null,
          nomeprox:null,
        },
        aceite: false,
        isLoading: false,
        rules:{
          required:[ v => !!v || 'Campo obrigatório!'],
          periodo: [ v => (/^(\W|^)(1|2|3|4|5|6|7|8|9|10)(\W|$)/).test(v||'') || 'Período deve ser de 1 a 10']
        },
        loadingWizard: false,
        errorMsg: null,
        count: 0,
        rulesStep1:[],
        rulesStep2:[],
        rulesStep3:[],
        mensagemConclusao: 'Avaliação finalizada!',
        myDate : new Date().toLocaleDateString('pt-BR',
          {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          }),
      }
    },

    watch:{
      answer:{
        //vamos parar por aqui hj kk cara ja ajudou muito
        // flw, saindo aqui
        handler(value){
          if((value.sintomas || [])>0){
            // se a pessoa marcar um sintoma, ento ser adicionado a propriedade prox_recomendacao com a data futura
            this.answer.prox_recomendacao = setProxRecomendacao()
          }else{
            //este eh acionado quando a pessoa marca e em seguida desmarca o sintoma
            delete this.answer.prox_recomendacao
          }
          
        }, deep:true
      },
    sem_sintomas(value){
        if (value){
          // se a pessoa marcar "sem_sintomas" remove a propriedade sintomas
            delete this.answer.sintomas
            //este eh acionado diretamente pelo checkbox "sem_sintomas"
            delete this.answer.prox_recomendacao
        }else{
          // se a opcao sem sintomas estiver desmarcada, a propriedade recebe o tipo primitivo dela
            this.answer.sintomas = [ ]
        }
        console.log(this.answer)
    }
  },
    methods: {
      openLoading(){
        this.$vs.loading()
        setTimeout( ()=> {
          this.$vs.loading.close()
        }, 1000);
        this.submit()
      },

      openLoadingMatricula(){
        this.$vs.loading()
        setTimeout( ()=> {
          this.$vs.loading.close()
        }, 1000);
      },
      onDecode (decodedString) {
        // ...
      },
      rulesCheckbox(val){
        return [
          v => val.length>0 || 'Informe pelo menos uma opção!',
        ]
      },
      nextStep (n) {
        switch(n){
          case 2:
            if (this.$refs.form_step_1.validate()){
              this.el = n;
              this.getSintomas()
            }
            break;
          case 3:
            this.$refs.form_step_2.validate() ? this.el = n : this.el = this.el; break;
          default:
            this.el = 1
        }
      },
      previousStep (n) {
        this.el = n
      },

      getSintomas(){
        this.isLoading = true
        this.$http.get("http://servicoshomolog.undb.edu.br:8080/squad/sintoma/", {
          params:{},
          headers:{
            'Authorization':'Basic c3F1YWQ6U3F1YWRVbmRi',
            'Content-Type':'application/json'
          }
        })
          .then((response) => {
            this.sintomas = response.data;
            this.alert_message = '';
            this.isLoading = false;
            console.log('getsintomas',this.sintomas)
          })
          .catch((err) => {
            this.isLoading = false
            if(err.status)
              this.alert_message = 'Falha ao carregar Sintomas: '+err.body;
            console.error(err)
          })
      },

      getMatricula(){
        this.isLoading = true
        this.$http.get("http://servicoshomolog.undb.edu.br:8080/squad/aluno-r/", {
          params:{'q':this.answer.matricula},
          headers:{
            'Authorization':'Basic c3F1YWQ6U3F1YWRVbmRi',
            'Content-Type':'application/json'
          }
        })
          .then((response) => {
            if (response.data.has){
              this.informacaoes = response.data;
              this.answer.nome = response.data.aluno.nome;
              this.answer.codcurso = response.data.aluno.codcurso;
              this.answer.curso = response.data.aluno.curso;
              this.answer.periodo = response.data.aluno.periodo;
              this.answer.situacao = response.data.aluno.situacao;
              this.getAnswer()
              if (this.datacriada !== this.datahoje){
                console.log("Aluno liberado pra check")
              }else{
                 this.popupGreen = true
                this.restart()
                
              }
              // this.bloqDia()
              this.openLoadingMatricula(true)
              console.log(response.data)
            }else{
              this.answer.nome = null;
              this.answer.codcurso = null;
              this.answer.curso = null;
              this.answer.periodo = null;
              this.anchor.situacao = null;
            }
            console.log('getMatricula',response)
            this.alert_message = '';
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false
            if(err.status)
              this.alert_message = 'Falha ao carregar Matrícula: '+err.body;
            console.error(err)
          })
      },
      postAnswer(){
        this.isLoading = true
        this.$http.post("http://servicoshomolog.undb.edu.br:8080/squad/check/", this.answer,{
          headers:{
            'Authorization':'Basic c3F1YWQ6U3F1YWRVbmRi',
            'Content-Type':'application/json'
          }
        })
          .then((response) => {
            console.log('post',response);
            this.mensagemConclusao = 'Avaliação realizada com sucesso';
            this.isLoading = false;
            this.el = 4
            this.popupGreen = true
            this.restart
          })
          .catch((err) => {
            this.isLoading = false
            if (err.body.non_field_errors){
              console.log('Você já realizou a avaliação, hoje!')
              // this.mensagemConclusao, essa variavel esta sendo ouvida em algum componente? não
              // blz, coloquem ela em um "snack" eu acho depende de como t os componentes de vc, 
              // de preferencia usar um componente s pra exibir esses alertas
              this.mensagemConclusao = 'Você já realizou a avaliação, hoje!';
              this.popupsintomacovid = false
              this.popupa24horas = true
              this.el = 4
            }else if(err.status)
              this.alert_message = 'Falha ao salvar avaliação: ' + err;
            console.error(err)
          })
      },
      getAnswer: function () {
        this.$http.get("http://servicoshomolog.undb.edu.br:8080/squad/check/", {
          params: {'matricula': this.answer.matricula},
          headers: {
            'Authorization': 'Basic c3F1YWQ6U3F1YWRVbmRi',
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            this.check = response.data;
            let criado_em = this.check[0].registrated_at;
            let id_aluno = this.check[0].id;
            let nome_aluno = this.check[0].nome;
            let matricula_aluno = this.check[0].matricula
            let sintomas_check = this.check[0].sintomas
            this.datacriada = dataAtualFormatada(criado_em)
            this.datahoje = dataAtualFormatada(new Date())
            this.id_aluno_check = id_aluno
            this.nome_aluno_check = nome_aluno
            this.matricula_aluno_check = matricula_aluno
            this.sintomas_aluno = sintomas_check
            console.log("Data do ultimo check", this.datacriada)
            console.log(this.id_aluno_check)
            console.log("sintomas", sintomas_check)
            console.log('Aluno', this.nome_aluno_check)
            console.log('Matricula do Check', this.matricula_aluno_check)


          })
          .catch((err) => {
            this.isLoading = false
            if (err.status)
              this.alert_message = 'Falha ao carregar : ' + err.body;
            console.error(err)
          })
      },

      bloqSintomas(){// acho que seria uma boa alterar esse metodo pro watch
        //if ((this.answer.sintomas||[]).length > 0){ // acho que a logica eh essa, depois tu valida
        if (this.answer.sintomas){ 
          this.popupGreen = false
          this.popupsintomacovid = true
          // Se a pessoa marcar sintomas, adiciona a data futura
          this.answer.prox_recomendacao = setProxRecomendacao() // ele no t chegando nesse trecho
          

        }if(this.semsiontoma){
          console.log("Aluno liberado")
          console.log(this.sintomas)
          this.popupGreen = true
          this.popupsintomacovid = false
          //se a pessoa alegar sem sintomas, remove o atributo do objeto
          delete this.answer.prox_recomendacao // ele no t chegando nesse trecho
          
        }
      },

      bloqDia(){
        if (this.datacriada !== this.datahoje){
          this.popupGreen = true
          this.restart()
        }else{
          this.popupGreen = true
        }
      },

      bloqenvio(){
        if (this.answer.sintomas){
          this.postAnswer()
        }else{

        }

      },

      submit(){
        if (this.answer.matricula){
          console.log(this.answer)
          this.postAnswer()
          this.bloqSintomas()
          // this.popupGreen=true
          // this.restart()
        }else {
          this.restart()
          window.location.href = window.location
          console.log("Não pode enviar")
        }
      },

        restart(){
        // recarregar página
        // window.location.href = window.location

        //recarregar objeto
        this.el = 1
        this.answer.sintomas = []
        this.answer.matricula = null
        this.answer.nome = null
        this.answer.codcurso = null
        this.answer.curso = null
        this.answer.periodo = null
        this.aceite=false
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            alert("form submitted!");
          } else {
            // form have errors
          }
        })
      }
    },
    mounted(){
      //O Vue no ta conseguindo enxergar o script
      setProxRecomendacao()
      this.getSintomas()
      this.rulesStep1 = [()=> this.$refs.form_step_1.validate()]
      this.rulesStep2 = [()=> this.$refs.form_step_2.validate()]

    },

    components: {
      FormWizard,
      TabContent,
      QrcodeVue,
      Loading
    }
  }
</script>
