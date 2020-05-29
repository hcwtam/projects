text = [
    `I'm baby roof party normcore pok pok asymmetrical, tacos irony small batch chicharrones tofu yr shaman fanny pack raw denim authentic banjo. Fam subway tile asymmetrical tilde, man bun gluten-free snackwave quinoa humblebrag VHS thundercats portland XOXO. Bitters lomo mlkshk kogi. Hashtag organic jean shorts crucifix pok pok aesthetic. Vape meh 3 wolf moon, lumbersexual vinyl poke meditation retro small batch cardigan.`,
    `La croix irony affogato woke. Seitan swag umami taiyaki kitsch four loko narwhal authentic copper mug, ennui air plant photo booth art party squid. Enamel pin ethical twee cornhole vexillologist quinoa gochujang. Literally craft beer deep v twee gochujang authentic, wayfarers tattooed. Tumeric bitters portland you probably haven't heard of them crucifix tumblr. Irony crucifix trust fund prism semiotics scenester. Deep v single-origin coffee paleo church-key ennui mustache sustainable scenester.`,
    `VHS hammock coloring book, mixtape poutine chicharrones migas blue bottle polaroid readymade shoreditch letterpress single-origin coffee gochujang vexillologist. Microdosing whatever scenester +1 letterpress twee locavore pitchfork chartreuse lo-fi mixtape. Man bun readymade meh live-edge skateboard. Brooklyn af vaporware occupy fam succulents.`,
    `Typewriter prism photo booth, hoodie man braid 90's godard retro synth kale chips blue bottle freegan selvage iPhone. Af humblebrag occupy, williamsburg fashion axe scenester keytar snackwave before they sold out typewriter. Tilde food truck street art, iPhone quinoa fashion axe scenester XOXO small batch chillwave master cleanse. Fingerstache crucifix pickled four loko farm-to-table.`,
    'Poutine fixie literally, cornhole jianbing crucifix hella. Brunch paleo slow-carb fam unicorn bushwick freegan vape cronut coloring book ugh fanny pack. Polaroid banh mi wolf, franzen bitters tilde photo booth locavore succulents leggings portland selvage pop-up. Food truck pabst irony literally crucifix master cleanse butcher authentic small batch gentrify. Freegan distillery bushwick, unicorn viral chicharrones polaroid vexillologist skateboard shabby chic irony bespoke small batch lomo keffiyeh. Before they sold out man bun crucifix tofu raclette sartorial, leggings pour-over irony.',
    'Ramps kogi cliche narwhal. Twee sustainable bicycle rights hell of, raclette polaroid chillwave typewriter. Meditation taiyaki slow-carb coloring book 90\'s kale chips fixie brunch tote bag tumeric cardigan art party polaroid. Bushwick fixie succulents umami everyday carry drinking vinegar woke crucifix 90\'s post-ironic. Listicle messenger bag dreamcatcher kickstarter, iceland raw denim squid butcher +1 skateboard. Air plant YOLO lo-fi raw denim knausgaard. Tousled kitsch austin, microdosing air plant normcore freegan hammock migas squid shabby chic gluten-free prism.',
    'Cardigan kitsch mlkshk seitan brunch authentic twee palo santo cliche flexitarian pop-up. Keffiyeh selfies blog hell of crucifix, green juice humblebrag tilde woke actually. Brooklyn bitters messenger bag tousled. Kogi austin farm-to-table direct trade. Put a bird on it blue bottle drinking vinegar mlkshk master cleanse. Adaptogen portland cray gentrify gluten-free pork belly keytar hashtag selvage.',
    'Aesthetic roof party af franzen stumptown poutine dreamcatcher waistcoat brunch small batch tumeric 3 wolf moon. Organic blue bottle coloring book copper mug, listicle ugh farm-to-table meggings disrupt cornhole neutra swag. Bicycle rights flexitarian mumblecore cred etsy sartorial cliche crucifix. Tofu gluten-free +1 pitchfork mumblecore YOLO air plant, activated charcoal whatever prism gastropub selfies DIY mixtape tacos. YOLO blue bottle tilde, ethical intelligentsia dreamcatcher literally health goth palo santo.',
    'Pug umami vexillologist, typewriter vice 3 wolf moon irony meggings. Messenger bag man bun food truck unicorn iceland, fam slow-carb gochujang health goth etsy taxidermy viral freegan hammock wolf. Vape raw denim try-hard pug tacos. Dreamcatcher biodiesel pinterest leggings, jean shorts actually tote bag try-hard roof party. Next level roof party scenester jean shorts man braid skateboard direct trade literally semiotics man bun single-origin coffee gluten-free heirloom. Tumblr echo park wolf mixtape, glossier tousled stumptown 90\'s jianbing.'
]

const form = document.querySelector('.lorem-form');
const amount = document.getElementById('amount');
const result = document.querySelector('.lorem-text');

form.addEventListener('submit', e => {
    e.preventDefault();

    const value = parseInt(amount.value);
    const random = Math.floor(Math.random() * text.length);

    if (isNaN(value) || value < 0 || value > 9) result.innerHTML = '';
    else if (value === "" || value === 1) result.innerHTML = `<p class="result">${text[random]}</p>`;
    else {
        let temp = [];
        let array = [];

        // populate array of numbers from 0 to value
        for (let i = 0; i < value; i++) array.push(i);

        //shuffle values
        array = shuffle(array);

        for (let i = 0; i < value; i++) {
            temp.push(text[array[i]]);
        };
        temp = temp.map(item => `<p class="result">${item}</p>`)
                   .join('');
        result.innerHTML = temp;
    }
})

// randomise array of numbers
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}