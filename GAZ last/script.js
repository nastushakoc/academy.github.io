const App = {
    data() {
        return {
            regName: '',
            password: '',
            email: '',
            regStatus: '',
            
            username: '',
            rate: '',
            status:'',
            comment:'',
            popo: '',

            regEmail: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            regulName: /^[А-Я]+[а-я]+\s[А-Я]+[а-я]+$/,
            errorVisibleEmail: false,
            errorVisibleName: false,
            openAdd: false,
            hiddenAdd: true,
            podskazka: false,
            
            comments:[
                {username: 'Яна Гудкова', rate:'5', status:'Проходит', comment: 'Пожалуй, это лучшая академия, с которой мне приходилось иметь дело, так как она предоставляет знания на достойном уровне и обеспечивает рациональный процесс обучения. Можно заниматься в комфортном графике и всегда быть на связи с куратором!'},
                {username: 'Софья Кильдяева', rate:'5', status:'Проходит', comment: 'Благодарю создателей школы и разработчиков продуктов за уникальную возможность – учиться в удобном формате и получать по-настоящему качественные, ценные знания.'},
                {username: 'Анастасия Козлова', rate:'5', status:'Проходит', comment: 'Учебное заведение, идущее в ногу со временем. Отличное качество программ для обучения и повышения квалификации.'}
            ]
        }


    },
    methods: {
        open(event){
            event.target.previousSibling.classList.toggle('close');
            if(event.target.previousSibling.classList.contains('close')) {
                event.target.innerHTML = 'Скрыть';
            } else {
                event.target.innerHTML = 'Подробнее';
            }
        },
        openAuto() {
            formm.classList.add('opin');
            popupbackground.classList.add('opinback');
        },
        closeAuto(){
            formm.classList.remove('opin');
            popupbackground.classList.remove('opinback');
        },
        openMenu() {
            burgerMenu.classList.add('active');
        },
        closeMenu() {
            burgerMenu.classList.remove('active');
        },
        openReg() {
            formReg.classList.add('opin');
            popupbackground.classList.add('opinback');
        },
        closeReg(){
            formReg.classList.remove('opin');
            popupbackground.classList.remove('opinback');
            this.regName = '';
            this.password = '';
            this.email = '';
            this.regStatus = '';
            this.errorVisibleEmail = false;
            this.errorVisibleName = false;
        },
        checkEmail(){
            if (this.regEmail.test(this.email) == false) {
                this.errorVisibleEmail = true;
            } else {
                this.errorVisibleEmail = false;
            }
        },
        checkName() {
            if (this.regulName.test(this.regName) == false) {
                this.errorVisibleName = true;
            } else {
                this.errorVisibleName = false;
            }
        },
        reg() {
            if (localStorage.length !== 0) {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = localStorage[key];
                    let user = JSON.parse(value);
                    if (user.regName !== this.regName && user.password !== this.password && user.email !== this.email) {
                        let key = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                        const user = {
                            regName: this.regName,
                            password: this.password,
                            email: this.email,
                            regStatus: this.regStatus,
                        }
                        if (this.errorVisibleEmail == false && this.errorVisibleName == false) {
                            localStorage.setItem(key.toString(), JSON.stringify(user));
                            formReg.classList.remove('opin');
                            popupbackground.classList.remove('opinback');
                            this.regName = '';
                            this.password = '';
                            this.email = '';
                            this.regStatus = '';
                        }
                        break;
                    } else {
                        alert('Пользователь уже существует!');
                    }
                }
            } else {
                let key = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                const user = {
                    regName: this.regName,
                    password: this.password,
                    email: this.email,
                    regStatus: this.regStatus,
                }
                if (this.errorVisibleEmail == false) {
                    localStorage.setItem(key.toString(), JSON.stringify(user));
                    this.regName = '';
                    this.password = '';
                    this.email = '';
                    this.regStatus = '';
                    formReg.classList.remove('opin');
                    popupbackground.classList.remove('opinback');
                } 
            }
        },
        auto() {
            if (this.regName.length != 0 && this.password.length != 0) {
                let userAuto;
                for(let i = 0; i<localStorage.length; i++){
                    const key = localStorage.key(i);
                    const value = localStorage[key];
                    let user = JSON.parse(value);
                    if(user.regName === this.regName && user.password === this.password) {
                        userAuto = user;
                        popo = this.regName;
                        formm.classList.remove('opin');
                        popupbackground.classList.remove('opinback');                        
                        this.regName = '';
                        this.password = '';
                        this.hiddenAdd= false;
                        this.podskazka = true;
                        one.classList.add('menuneautoactive');
                        two.classList.add('menuautoactive');
                        break;
                    }
                }
                if(!userAuto) {
                    alert('Пользователь не найден');
                    this.regName = '';
                    this.password = '';
                }
            } else {
                alert('Все поля обязательны для заполнения')
            }
        },
        openModalAdd() {
            this.openAdd = true;
            popupbackground.classList.add('opinback');
            this.username = '';
            this.rate = '';
            this.status = '';
            this.comment = '';
        },
        closeModalAdd(){
            this.openAdd = false;
            popupbackground.classList.remove('opinback');
        },
        addComment() {
            let comm = {
                username: this.username,
                rate: this.rate,
                status: this.status,
                comment: this.comment,
            }
            this.comments.push(comm);

            this.openAdd = false;
            popupbackground.classList.remove('opinback');
        },
    }
}
const app = Vue.createApp(App);
app.mount('#app');
