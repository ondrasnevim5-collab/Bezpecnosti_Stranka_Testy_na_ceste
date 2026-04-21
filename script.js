// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

function scrollToTests() {
  document.getElementById('testy').scrollIntoView({ behavior: 'smooth' });
}

// ===== ALL 10 TESTS =====
const TESTS = [
  {
    id: 1,
    title: "Základní dopravní značky",
    desc: "Poznáš nejdůležitější značky pro cyklisty?",
    emoji: "🚦",
    tags: ["Značky", "Základ"],
    questions: [
      { cat: "Dopravní značky", q: "Co znamená tato značka? 🔴⛔", img: "⛔", opts: ["Zákaz vjezdu všech vozidel", "Zákaz parkování", "Konec omezení", "Zákaz otáčení"], ans: 0, fb: "Značka 'Zákaz vjezdu' zakazuje vjezd všem vozidlům, tedy i cyklistům." },
      { cat: "Dopravní značky", q: "Co označuje tato modrá značka? 🚳", img: "🚳", opts: ["Zákaz jízdy na kole", "Povinná cyklostezka", "Doporučená trasa", "Opravna kol"], ans: 0, fb: "Přeškrtnuté kolo na modrém podkladu znamená zákaz jízdy na jízdním kole." },
      { cat: "Dopravní značky", q: "Co znamená kruhový modrý znak s bílým kolem? 🚵", img: "🚵", opts: ["Zákaz cyklistů", "Stezka pro cyklisty – povinná", "Doporučená cyklostezka", "Cykloservis"], ans: 1, fb: "Modrý kruh s bílým kolem označuje stezku výhradně pro cyklisty – jízda po ní je povinná." },
      { cat: "Dopravní značky", q: "Co znamená žlutý trojúhelník s vykřičníkem? ⚠️", img: "⚠️", opts: ["Nebezpečí (všeobecné)", "Zákaz průjezdu", "Konec obce", "Železniční přejezd"], ans: 0, fb: "Žlutý trojúhelník s vykřičníkem je výstražná značka – Jiné nebezpečí." },
      { cat: "Dopravní značky", q: "Co říká značka s číslem 30 v červeném kruhu?", img: "🔴", opts: ["Maximální rychlost 30 km/h", "Minimální rychlost 30 km/h", "Vzdálenost 30 m", "Váha do 30 kg"], ans: 0, fb: "Číslo v červeném kruhu je maximální povolená rychlost. Pro cyklistu platí stejně jako pro auto." },
      { cat: "Dopravní značky", q: "Jakou barvu mají zákazové značky?", img: "🔴", opts: ["Červený kruh na bílém pozadí", "Modrý kruh", "Žlutý trojúhelník", "Zelený obdélník"], ans: 0, fb: "Zákazové značky jsou vždy bílé s červeným kruhem a červenou diagonální čarou nebo červeným okrajem." },
      { cat: "Dopravní značky", q: "Co označuje zelená značka s šipkou?", img: "🟢", opts: ["Navigační/směrová značka", "Zákaz vjezdu", "Parkoviště", "Jednosměrný provoz"], ans: 0, fb: "Zelené obdélníkové značky jsou provozní informační – ukazují směr, vzdálenosti, cíle." },
      { cat: "Dopravní značky", q: "Co je to dopravní stín (přerušovaná čára)?", img: "〰️", opts: ["Jízdní pruhy lze přejíždět", "Pruhy nelze přejíždět", "Konec vozovky", "Zákaz předjíždění"], ans: 0, fb: "Přerušovaná čára uprostřed vozovky odděluje pruhy, které lze přejíždět při dodržení bezpečnosti." },
      { cat: "Dopravní značky", q: "Značka P4 – Dej přednost v jízdě – vypadá jako:", img: "🔺", opts: ["Bílý trojúhelník s červeným okrajem (hrot dolů)", "Červený osmiúhelník", "Žlutý kosočtverec", "Modrý kruh"], ans: 0, fb: "P4 je bílý trojúhelník s červeným okrajem otočený hrotem dolů. Musíš dát přednost." },
      { cat: "Dopravní značky", q: "Kde se nesmí cyklista zastavit ani stát?", img: "🚫", opts: ["Na přechodu pro chodce", "Na cyklostezce", "Na kraji vozovky", "Kdekoliv"], ans: 0, fb: "Na přechodu pro chodce a 5 m před ním je zastavení i stání zakázáno." },
      { cat: "Dopravní značky", q: "Co znamená značka 'Obytná zóna'?", img: "🏘️", opts: ["Max. 20 km/h, chodci mají přednost", "Max. 50 km/h, jen auta", "Zákaz vstupu cyklistů", "Povolené parkování"], ans: 0, fb: "V obytné zóně je rychlost omezena na 20 km/h a chodci mají přednost před vozidly." },
      { cat: "Dopravní značky", q: "Značka 'Pěší zóna' – smí tam jet cyklista?", img: "🚶", opts: ["Jen pokud je uvedena výjimka pro cyklisty", "Vždy smí", "Nikdy", "Jen v noci"], ans: 0, fb: "V pěší zóně je vjezd cyklistů zakázán, pokud není značkou výslovně povolena výjimka." },
      { cat: "Dopravní značky", q: "Co označuje čtverec s modrým 'P'?", img: "🅿️", opts: ["Parkoviště", "Policejní stanice", "Poliklinika", "Přechod"], ans: 0, fb: "Modrý čtverec s bílým 'P' je mezinárodní znak pro parkoviště." },
      { cat: "Dopravní značky", q: "Značka B30 zakazuje vjezd vozidel nad určitou šířku. Platí pro cyklisty?", img: "📏", opts: ["Ne, cyklisté jsou většinou užší", "Ano, vždy", "Jen pro horská kola", "Jen pokud mají přívěs"], ans: 0, fb: "Kola jsou obvykle do 0,75 m – omezení šířky se na ně prakticky nevztahuje." },
      { cat: "Dopravní značky", q: "Co říká červený osmiúhelník STOP?", img: "🛑", opts: ["Zastav, dej přednost a pokračuj až kdy je bezpečno", "Zpomal na 30 km/h", "Zákaz vjezdu", "Konec obce"], ans: 0, fb: "Značka STOP ukládá povinnost úplně zastavit vozidlo a dát přednost v jízdě." },
      { cat: "Dopravní značky", q: "Žlutý kosočtverec na silnici znamená:", img: "🟡", opts: ["Hlavní pozemní komunikace", "Zákaz předjíždění", "Silnice nižší třídy", "Konec dálnice"], ans: 0, fb: "Žlutý kosočtverec označuje hlavní komunikaci – vozidla na vedlejší dávají přednost tobě." },
      { cat: "Dopravní značky", q: "Co označuje modrý obdélník s bílou šipkou?", img: "↗️", opts: ["Příkazová značka – přikazuje jet daným směrem", "Zákaz otočení", "Doporučená trasa", "Dálnice"], ans: 0, fb: "Modré obdélníky s šipkami jsou příkazové značky – říkají, kudy MUSÍŠ jet." },
      { cat: "Dopravní značky", q: "Kdy platí značka 'Zákaz vjezdu' i pro cyklistu?", img: "⛔", opts: ["Vždy, pokud není tabule výjimky pro kola", "Nikdy pro kola", "Jen v noci", "Jen na dálnicích"], ans: 0, fb: "Zákaz vjezdu platí pro všechna vozidla, tedy i jízdní kola, pokud není dodatkovou tabulkou uvedena výjimka." },
      { cat: "Dopravní značky", q: "Značka 'Konec všech zákazů' – co ukončuje?", img: "🔵", opts: ["Všechny lokální zákazové značky najednou", "Jen zákaz rychlosti", "Jen zákaz parkování", "Konec obce"], ans: 0, fb: "Šedý kruh s přeškrtnutými pruhy ukončuje všechny zákazové značky, které platily na daném úseku." },
      { cat: "Dopravní značky", q: "Trojúhelník s vlakem a závorami – kde tě varuje?", img: "🚂", opts: ["Železniční přejezd se závorami", "Vlakové nádraží", "Muzeum vláčků", "Zákaz průjezdu vlaků"], ans: 0, fb: "Výstražná značka upozorňuje na blížící se železniční přejezd vybavený závorami." }
    ]
  },
  {
    id: 2,
    title: "Přednost v jízdě na křižovatce",
    desc: "Kdo jede první? Otestuj pravidlo pravé ruky a více.",
    emoji: "🔀",
    tags: ["Křižovatka", "Přednost"],
    questions: [
      { cat: "Přednost v jízdě", q: "Na neobjízdné křižovatce bez značek – kdo má přednost?", img: "➕", opts: ["Vozidlo přijíždějící zprava", "Vozidlo přijíždějící zleva", "Kdo přijede první", "Kdo je rychlejší"], ans: 0, fb: "Platí pravidlo pravé ruky – vozidlo přijíždějící zprava má přednost." },
      { cat: "Přednost v jízdě", q: "Auto vyjíždí z parkoviště na silnici. Kdo má přednost – auto nebo cyklista na silnici?", img: "🚗", opts: ["Cyklista na silnici", "Auto z parkoviště", "Kdo je blíže", "Oba mají stejnou přednost"], ans: 0, fb: "Vozidlo vyjíždějící z místa mimo komunikaci (parkoviště, dvůr) dává přednost všem na silnici." },
      { cat: "Přednost v jízdě", q: "Cyklista jede po hlavní silnici. Na vedlejší silnici stojí auto. Kdo jede první?", img: "🚴", opts: ["Cyklista na hlavní", "Auto na vedlejší", "Záleží na rychlosti", "Záleží na velikosti vozidla"], ans: 0, fb: "Na hlavní silnici (žlutý kosočtverec) mají vozidla přednost před těmi na vedlejší." },
      { cat: "Přednost v jízdě", q: "Při vjezdu na kruhový objezd – kdo má přednost?", img: "🔄", opts: ["Vozidla již jedoucí na kruhovém objezdu", "Vozidla vjíždějící na objezd", "Záleží na zemi", "Kdo je větší"], ans: 0, fb: "V ČR mají přednost vozidla již jedoucí na kruhovém objezdu, pokud není značkou určeno jinak." },
      { cat: "Přednost v jízdě", q: "Tramvaj a cyklista – kdo má přednost obecně?", img: "🚃", opts: ["Tramvaj má přednost", "Cyklista má přednost", "Záleží na směru", "Záleží na době"], ans: 0, fb: "Tramvaj má všeobecně přednost v jízdě před ostatními vozidly, pokud není stanoveno jinak." },
      { cat: "Přednost v jízdě", q: "Auto odbočuje vpravo, cyklista jede rovně po cyklostezce souběžné se silnicí. Kdo má přednost?", img: "↪️", opts: ["Cyklista jedoucí rovně po cyklostezce", "Auto odbočující vpravo", "Záleží kdo přijel dříve", "Oba mají povinnost zastavit"], ans: 0, fb: "Auto odbočující přes cyklostezku musí dát přednost cyklistům jedoucím po cyklostezce." },
      { cat: "Přednost v jízdě", q: "Chodec přechází po přechodu pro chodce. Musí mu dát cyklista přednost?", img: "🚶", opts: ["Ano, vždy", "Ne, cyklista má přednost", "Jen pokud chodec zvedne ruku", "Jen v noci"], ans: 0, fb: "Před přechodem pro chodce musí cyklista (jako každý jiný řidič) dát přednost chodci." },
      { cat: "Přednost v jízdě", q: "Na křižovatce jsou čtyři auta ze všech čtyř stran. Jak se vyřeší přednost?", img: "🚗", opts: ["Nikdo nemá přednost – domluví se nebo přijde policie", "Největší vozidlo jde první", "Ten co přijel nejpomaleji", "Cyklista vždy první"], ans: 0, fb: "Pokud by si všichni dávali přednost, vznikne patová situace. Řeší se dohodou nebo pokyncem policie." },
      { cat: "Přednost v jízdě", q: "Cyklista odbočuje vlevo. Musí dát přednost protijedoucím vozidlům?", img: "↩️", opts: ["Ano, vždy při odbočování vlevo", "Ne, má jako cyklista výjimku", "Jen autům, ne motorkám", "Jen pokud je tam značka"], ans: 0, fb: "Při odbočování vlevo musí cyklista i každý jiný řidič dát přednost protijedoucím vozidlům." },
      { cat: "Přednost v jízdě", q: "Co je pravidlo pravé ruky platné v ČR?", img: "👉", opts: ["Vozidlo zprava má přednost na neoznačené křižovatce", "Vždy jet co nejpravěji", "Držet se pravé strany vozovky", "Předjíždět jen zprava"], ans: 0, fb: "Pravidlo pravé ruky: na nezajištěné křižovatce má přednost ten, kdo přijíždí zprava." },
      { cat: "Přednost v jízdě", q: "Cyklista přijíždí zleva, auto zprava – kdo jede na neobjízdné křižovatce první?", img: "🔀", opts: ["Auto, přijíždí zprava", "Cyklista, přijíždí zleva", "Oba jedou současně", "Záleží na době dne"], ans: 0, fb: "Auto přijíždí zprava – má přednost. Cyklista zastaví a nechá auto projet." },
      { cat: "Přednost v jízdě", q: "Kde má tramvaj na přejezdu kolejí od cyklisty vždy přednost?", img: "🚋", opts: ["Všude na tramvajových přejezdech", "Jen na označených místech", "Jen pokud troubí", "Tramvaj nemá přednost před cyklisty"], ans: 0, fb: "Tramvaj jako kolejové vozidlo má na tramvajových přejezdech vždy přednost." },
      { cat: "Přednost v jízdě", q: "Pokud cyklista jede po chodníku (kde je to povoleno), musí dát přednost autům na výjezdu z garáže?", img: "🏠", opts: ["Ano – je na místě mimo vozovku", "Ne – auto musí čekat", "Záleží na městě", "Záleží na rychlosti cyklisty"], ans: 0, fb: "Vozidlo vyjíždějící z garáže, dvora nebo soukromého pozemku dává přednost všem, i cyklistům na chodníku." },
      { cat: "Přednost v jízdě", q: "Jde o 'sérii' předností – cyklista A (zprava) vs. auto B (zleva) – kdo jede?", img: "🚴", opts: ["Cyklista A (přijíždí zprava)", "Auto B (přijíždí zleva)", "Kdo je větší", "Náhodně"], ans: 0, fb: "Pravidlo pravé ruky se týká vozidla přijíždějícího zprava – tedy cyklista A." },
      { cat: "Přednost v jízdě", q: "Na dálnici (i zpomalené komunikaci) – smí cyklisté jet po ní v ČR?", img: "🛣️", opts: ["Ne, cyklisté nesmí na dálnici", "Ano bez omezení", "Ano jen v pruhu pro motorky", "Ano jen v noci"], ans: 0, fb: "Cyklisti nesmí jezdit po dálnicích ani silnicích pro motorová vozidla v ČR." },
      { cat: "Přednost v jízdě", q: "Při objetí překážky vlevo – co musí cyklista udělat?", img: "↩️", opts: ["Přesvědčit se, že může bezpečně jet, a dát přednost protijedoucím", "Jet co nejrychleji", "Zastavit vždy", "Troubit"], ans: 0, fb: "Při odbočení/vybočení vlevo musí dát přednost protijedoucím vozidlům." },
      { cat: "Přednost v jízdě", q: "Cyklista jede rychleji než chodci – kdo komu dává přednost v pěší zóně?", img: "🚶", opts: ["Cyklista dává přednost chodcům", "Chodci dávají přednost cyklistovi", "Rychlejší má přednost", "Záleží na pruhu"], ans: 0, fb: "V pěší zóně (pokud je vjezd cyklistů povolen) musí cyklista dávat přednost chodcům." },
      { cat: "Přednost v jízdě", q: "Který pokyn policisty na křižovatce platí před značkou?", img: "👮", opts: ["Pokyn policisty vždy nadřazuje značku", "Značka nadřazuje pokyn", "Obě mají stejnou váhu", "Záleží na hodnosti policie"], ans: 0, fb: "Pokyny policisty mají přednost před dopravními značkami i světelnými signály." },
      { cat: "Přednost v jízdě", q: "Semafory – zelená pro cyklistu. Chodec chce přejít – kdo má přednost?", img: "🟢", opts: ["Cyklista má zelenou, chodec musí počkat", "Chodec má vždy přednost", "Záleží kdo přišel dřív", "Záleží na denní době"], ans: 0, fb: "Zelená pro cyklistu mu dává přednost – chodec musí počkat, pokud nemá sám zelenou." },
      { cat: "Přednost v jízdě", q: "Co musí cyklista udělat, pokud je řízení provozu křižovatky přerušeno a policie nestojí?", img: "🚦", opts: ["Chovat se, jako by byla neřízená křižovatka – pravidlo pravé ruky", "Zastavit navždy", "Jet na červenou", "Jet chodníkem"], ans: 0, fb: "Pokud výpadek semaforů není řízen policistou, platí pravidla neobjízdné křižovatky – pravidlo pravé ruky." }
    ]
  },
  {
    id: 3,
    title: "Bezpečnost a výbava kola",
    desc: "Víš, co musí mít tvé kolo a co nosit ty?",
    emoji: "🪖",
    tags: ["Výbava", "Bezpečnost"],
    questions: [
      { cat: "Výbava kola", q: "Co musí mít cyklistické kolo povinně ze zákona v ČR?", img: "🚲", opts: ["Brzdy, světla, odrazky a zvonec", "Jen brzdy", "Jen světla", "Jen zvonec"], ans: 0, fb: "Zákon ukládá: funkční brzdy, přední bílé světlo, zadní červené světlo, odrazky a zvonec." },
      { cat: "Výbava kola", q: "Od kolika let je helma pro cyklistu v ČR povinná?", img: "🪖", opts: ["Do 18 let je povinná", "Do 15 let", "Povinná pro všechny", "Povinná jen na silnici"], ans: 0, fb: "Zákon č. 361/2000 Sb. ukládá povinnost nosit helmu cyklistům do 18 let." },
      { cat: "Výbava kola", q: "Musí mít cyklistická helma certifikaci?", img: "✅", opts: ["Ano, musí splňovat normu EN 1078 nebo podobnou", "Ne, stačí jakákoliv helma", "Jen závodní helma", "Ne, jen motocyklová helma"], ans: 0, fb: "Helma musí splňovat bezpečnostní normu (EN 1078 pro cyklistické přilby)." },
      { cat: "Výbava kola", q: "Jakou barvu musí mít přední světlo cyklisty?", img: "💡", opts: ["Bílou nebo žlutou", "Červenou", "Zelenou", "Modrou"], ans: 0, fb: "Přední světlo musí být bílé nebo žlutobílé, zadní světlo červené." },
      { cat: "Výbava kola", q: "Kde musí být zadní odrazka na kole?", img: "🔴", opts: ["Vzadu – červená", "Vpředu – bílá", "Na boku – žlutá", "Kdekoli"], ans: 0, fb: "Zadní odrazka musí být červená a umístěna vzadu na kole." },
      { cat: "Výbava kola", q: "Smí cyklista jet na kole bez brzd?", img: "🚫", opts: ["Ne, brzdy jsou zákonnou povinností", "Ano, pokud je zkušený", "Ano na cyklostezce", "Ano jen v noci"], ans: 0, fb: "Kolo musí mít funkční brzdy – jízda bez brzd je zákonem zakázána." },
      { cat: "Výbava kola", q: "Jak daleko musí být viditelné přední světlo cyklisty?", img: "🔦", opts: ["Na vzdálenost nejméně 100 metrů", "Na 10 metrů", "Na 50 metrů", "Na 200 metrů"], ans: 0, fb: "Přední světlo cyklisty musí být za snížené viditelnosti viditelné nejméně na 100 metrů." },
      { cat: "Výbava kola", q: "Musí mít kolo boční žluté odrazky na špicích?", img: "🟡", opts: ["Ano, pro lepší viditelnost ze strany", "Ne, nejsou povinné", "Jen na horských kolech", "Jen v zimě"], ans: 0, fb: "Zákon předepisuje i boční odrazky (na špicích nebo obručích) pro viditelnost ze strany." },
      { cat: "Výbava kola", q: "Smí cyklista používat telefon (v ruce) za jízdy?", img: "📵", opts: ["Ne, je to zakázáno", "Ano, krátkodobě", "Ano pokud jede pomalu", "Záleží na státu"], ans: 0, fb: "Používání telefonu v ruce za jízdy je zákonem zakázáno, stejně jako u řidičů aut." },
      { cat: "Výbava kola", q: "Je povoleno jezdit se sluchátky v obou uších na kole?", img: "🎧", opts: ["Ne – snižuje to schopnost vnímat okolí a je zakázáno v ČR", "Ano bez omezení", "Jen při pomalé jízdě", "Jen na cyklostezce"], ans: 0, fb: "V ČR je zakázáno používat sluchátka v obou uších při jízdě na kole, protože snižuje vnímání provozu." },
      { cat: "Výbava kola", q: "Smí cyklista vézt spolujezdce na rámu?", img: "👥", opts: ["Ne, pokud kolo není uzpůsobeno pro spolujezdce", "Ano vždy", "Ano jen dítě", "Ano jen dospělého"], ans: 0, fb: "Přeprava osoby na rámu nebo blatníku je zakázána, pokud kolo není vybaveno sedlem a stupačkami pro spolujezdce." },
      { cat: "Výbava kola", q: "Od kolika let smí děti jet na kole samostatně na silnici bez doprovodu?", img: "👦", opts: ["Od 10 let", "Od 6 let", "Od 15 let", "Od 18 let"], ans: 0, fb: "Děti do 10 let smí jezdit na kole na pozemní komunikaci jen v doprovodu osoby starší 18 let." },
      { cat: "Výbava kola", q: "Je povoleno nést na kole tyč přesahující 1 metr délkou?", img: "📏", opts: ["Jen pokud je řádně označena a nepřesahuje více než 1 m za kolo", "Vždy ano", "Vždy ne", "Jen na cyklostezce"], ans: 0, fb: "Předmět lze vézt na kole jen pokud nepřesahuje šířku řidítek a délku o více než 1 metr a je řádně zajištěn." },
      { cat: "Výbava kola", q: "Musí mít cyklista za mlhy reflexní vestu?", img: "🦺", opts: ["Zákon ji přímo ukládá za snížené viditelnosti mimo obec", "Ne, stačí světla", "Jen v noci", "Jen na dálnici"], ans: 0, fb: "V ČR je reflexní vesta povinná pro chodce a cyklisty pohybující se na vozovce mimo obec za snížené viditelnosti." },
      { cat: "Výbava kola", q: "Smí být kolo vybaveno generátorem (dynamo) místo baterek?", img: "⚡", opts: ["Ano, dynamo je plně akceptovatelné", "Ne, jen baterie", "Jen na závodních kolech", "Ne, jen LED svítilny"], ans: 0, fb: "Dynamo (generátor) je plně legální a akceptovaný způsob napájení světel kola." },
      { cat: "Výbava kola", q: "Jakou maximální šířku může mít náklad převážený na kole?", img: "📦", opts: ["Nesmí přesáhnout šířku řidítek", "Max. 1 metr", "Max. 0,5 metru", "Bez omezení"], ans: 0, fb: "Náklad smí mít šířku nejvýše odpovídající šířce řidítek kola." },
      { cat: "Výbava kola", q: "Smí cyklista táhnout za sebou jiné kolo?", img: "🚲", opts: ["Jen speciálně uzpůsobeným zařízením nebo přívěsem", "Vždy ano", "Vždy ne", "Jen v noci"], ans: 0, fb: "Cyklista smí táhnout jiné kolo nebo vozík jen s příslušným bezpečnostním zařízením a v souladu s pravidly." },
      { cat: "Výbava kola", q: "Musí mít cyklistická brzda fungovat na jednu brzdu nebo obě?", img: "🛑", opts: ["Každé kolo musí mít přední i zadní brzdu", "Stačí jen zadní", "Stačí jen přední", "Záleží na rychlosti"], ans: 0, fb: "Zákon vyžaduje funkční přední i zadní brzdu na jízdním kole." },
      { cat: "Výbava kola", q: "Co je povinné u kola jedoucího v koloně (group ride)?", img: "🚴‍♀️", opts: ["Všechna kola musí splňovat zákonné vybavení, řazení do dvou řad max.", "Třetí světlo vzadu", "Vozit zásoby vody", "Vesta pro každého"], ans: 0, fb: "Skupina cyklistů smí jet ve dvou řadách, každé kolo musí mít zákonnou výbavu (světla, brzdy, odrazky)." },
      { cat: "Výbava kola", q: "Jak se cyklista signalizuje jinému motoristovi, že chce zatočit vlevo?", img: "✋", opts: ["Levou rukou vodorovně nataženou vlevo", "Pravou rukou nahoru", "Levou rukou dolů", "Zakřičí"], ans: 0, fb: "Odbočení vlevo se signalizuje natažením levé paže vodorovně do leva. Pravá paže vodorovně vpravo = odbočení vpravo." }
    ]
  },
  {
    id: 4,
    title: "Jízda ve městě",
    desc: "Pravidla pro cyklisty v městském provozu.",
    emoji: "🏙️",
    tags: ["Město", "Provoz"],
    questions: [
      { cat: "Město", q: "Smí cyklista jet po chodníku v obci?", img: "🚶", opts: ["Jen kde je to povoleno značkou nebo zákonem (děti, dospělí s dítětem)", "Vždy", "Nikdy", "Jen v noci"], ans: 0, fb: "V ČR mohou děti do 10 let jet po chodníku, a dospělí doprovázející dítě na kole." },
      { cat: "Město", q: "Na jednosměrné ulici – smí cyklista jet i v protisměru?", img: "↩️", opts: ["Jen pokud je to povoleno dodatkovým symbolem kola", "Vždy", "Nikdy", "Záleží na ulici"], ans: 0, fb: "V jednosměrné ulici smí cyklista jet v protisměru pouze pokud je to povoleno značkou (symbol kola s šipkou)." },
      { cat: "Město", q: "Kde v obci je maximální povolená rychlost pro cyklisty?", img: "🏙️", opts: ["Nesmí překročit 30 km/h v obytné zóně, jinde přizpůsobí okolí", "50 km/h vždy", "20 km/h vždy", "Bez omezení pro kola"], ans: 0, fb: "Cyklista musí přizpůsobit rychlost situaci a místním omezením. V obytné zóně max. 20 km/h." },
      { cat: "Město", q: "Smí cyklista jet vedle druhého cyklisty (dva vedle sebe) ve městě?", img: "👫", opts: ["Ano, pokud neomezují jiná vozidla", "Ne, vždy za sebou", "Ano vždy bez omezení", "Ne, jen mimo obec"], ans: 0, fb: "Cyklisté smí jet vedle sebe, pokud tím neohrožují ostatní účastníky provozu. Při hustém provozu by měli jet za sebou." },
      { cat: "Město", q: "Kam cyklista povinně zaparkuje kolo?", img: "🅿️", opts: ["Mimo jízdní pruhy a přechody, ideálně ke stojanu", "Kdekoliv", "Jen do garáže", "Záleží"], ans: 0, fb: "Kolo nesmí bránit provozu, musí být odstaveno bezpečně mimo jízdní pruhy a přechody." },
      { cat: "Město", q: "Musí cyklista dát přednost MHD (autobusu) vyjíždějícímu ze zastávky?", img: "🚌", opts: ["Ano, pokud autobus dává znamení a bezpečně to jde", "Ne, cyklista má vždy přednost", "Jen tramvaji", "Záleží na hodině"], ans: 0, fb: "Autobus (nebo trolejbus) vyjíždějící ze zastávky s výstražným světlem smí řidič aut i cyklista pustit." },
      { cat: "Město", q: "Smí cyklista jet přes přechod pro chodce?", img: "🦓", opts: ["Ne, musí sesednout a přejít kolo nebo použít cyklopřejezd", "Ano vždy", "Ano pokud není chodec", "Ano v noci"], ans: 0, fb: "Cyklista nesmí přejíždět přechod pro chodce na kole – musí sesednout a vést kolo nebo použít cyklopřejezd." },
      { cat: "Město", q: "Kde smí cyklista jet ve městě, pokud je cyklopruh?", img: "🛣️", opts: ["Musí použít cyklopruh, pokud je k dispozici", "Může jet libovolně", "Cyklopruh je jen doporučení", "Záleží na rychlosti"], ans: 0, fb: "Pokud je cyklopruh vyhrazen, cyklista je povinen ho používat." },
      { cat: "Město", q: "Na tramvajovém pásu – smí cyklista jet přes tramvajové koleje?", img: "🚋", opts: ["Ano, ale bezpečně (kolmo nebo pod ostrým úhlem)", "Ne, nikdy", "Ano libovolně", "Jen v noci"], ans: 0, fb: "Cyklista smí přejíždět koleje, ale musí to dělat bezpečně – ideálně kolmo, aby nezasekl kolo do drážky." },
      { cat: "Město", q: "Smí cyklista v obci jet na červenou přes prázdnou křižovatku?", img: "🔴", opts: ["Ne, červená platí pro všechny", "Ano, pokud není nebezpečí", "Ano v noci", "Záleží na velikosti kola"], ans: 0, fb: "Červená znamená stůj pro všechna vozidla včetně kol – jet na červenou je přestupek." },
      { cat: "Město", q: "Musí cyklista na kole signalizovat svůj pohyb jinými způsoby než rukou?", img: "🔔", opts: ["Může použít i zvonec nebo hlas jako zvukový signál", "Jen rukou", "Jen světlem", "Cyklista nemusí nic signalizovat"], ans: 0, fb: "Cyklista může upozornit na sebe zvoncem nebo i hlasem. Signalizace rukou je pro změnu směru." },
      { cat: "Město", q: "Je povoleno jet na kole s přívěsem (cargo bike trailer) ve městě?", img: "🛒", opts: ["Ano, pokud splňuje zákonné podmínky (světla, rozměry)", "Vždy bez podmínek", "Nikdy", "Jen přes den"], ans: 0, fb: "Přívěs za kolo je legální, musí ale splňovat podmínky – mít odrazky, splňovat rozměry." },
      { cat: "Město", q: "Co dělá cyklista v tunelu bez osvětlení?", img: "🕳️", opts: ["Zapne světla a jede bezpečně", "Zastaví a čeká", "Jede bez světel rychle", "Nesjíždí do tunelu"], ans: 0, fb: "V tunelu (i za dne) jsou povinná světla vozidel." },
      { cat: "Město", q: "Smí cyklista vézt psa na vodítku za jízdy?", img: "🐕", opts: ["Zákon to nezakazuje, ale je to rizikové a nevhodné", "Ano bez omezení", "Ano pokud má pes vínkování", "Ne, je to výslovně zakázáno"], ans: 0, fb: "Zákon to přímo nezakazuje, ale je to velmi nebezpečné a může být posouzeno jako ohrožení bezpečnosti." },
      { cat: "Město", q: "Smí cyklista vjet do podchodu pro chodce?", img: "🚇", opts: ["Jen pokud je to povoleno (zpravidla ne)", "Vždy", "Jen s klidnou chůzí", "Jen bez světel"], ans: 0, fb: "Do podchodů pro chodce smí cyklista pouze pokud je to povoleno, jinak je povinen kolo vést." },
      { cat: "Město", q: "Při srážce nebo dopravní nehodě – co musí cyklista udělat?", img: "🚑", opts: ["Zastavit, poskytnout první pomoc, zavolat policii (pokud je zranění/škoda nad limit)", "Odjet co nejrychleji", "Jen počkat", "Záleží kdo zavinil"], ans: 0, fb: "Po každé nehodě musí účastník zastavit, poskytnout první pomoc a při zranění nebo větší škodě zavolat policii." },
      { cat: "Město", q: "Smí cyklista jet ve skupině po celé šířce vozovky?", img: "👥", opts: ["Ne – max. dvě řady, nesmí bránit provozu", "Ano bez omezení", "Záleží na počtu", "Ano pokud mají vestu"], ans: 0, fb: "Skupina cyklistů může jet nanejvýš ve dvou řadách a nesmí zbytečně bránit provozu." },
      { cat: "Město", q: "Smí cyklista projet dopravní značkou 'Zákaz vstupu' pěšky (s kolem vedeným rukou)?", img: "⛔", opts: ["Ano – vedené kolo je chodec", "Ne – zákaz platí i pro vedené kolo", "Záleží na šířce ulice", "Záleží na místě"], ans: 0, fb: "Pokud je zákaz vstupu, platí i pro vedené kolo. Pokud je zákaz jen pro vozidla, pěší (i s kolem) projít smí." },
      { cat: "Město", q: "Kde smí cyklista předjet auto stojící v koloně zprava?", img: "🚗", opts: ["Jen pokud je vyhrazen cyklopruh nebo dostatečný prostor", "Vždy", "Nikdy", "Jen v noci"], ans: 0, fb: "Cyklista smí projet podél stojící kolony v bezpečném prostoru nebo vyhrazeném cyklopruhu." },
      { cat: "Město", q: "Co je sdílené kolo (bike sharing) a smí se na něm jezdit?", img: "📱", opts: ["Půjčené kolo z veřejné sítě – platí pro ně stejná pravidla jako pro vlastní", "Speciální kolo bez pravidel", "Kolo jen pro turisty", "Záleží na firmě"], ans: 0, fb: "Sdílená kola jsou plnohodnotná vozidla – platí pro ně stejná dopravní pravidla jako pro jakékoli jiné kolo." }
    ]
  },
  {
    id: 5,
    title: "Jízda mimo obec a v přírodě",
    desc: "Pravidla pro silnice, polní cesty a lesní stezky.",
    emoji: "🌲",
    tags: ["Příroda", "Silnice"],
    questions: [
      { cat: "Mimo obec", q: "Jak se má cyklista chovat na silnici mimo obec?", img: "🛣️", opts: ["Jet co nejblíže pravému okraji vozovky", "Jet uprostřed pruhu", "Jet po chodníku", "Jet po levé straně"], ans: 0, fb: "Mimo obec musí cyklista jet co nejblíže k pravému okraji vozovky." },
      { cat: "Mimo obec", q: "Smí cyklista jet v noci bez světel mimo obec?", img: "🌙", opts: ["Ne, světla jsou povinná za snížené viditelnosti", "Ano pokud zná trasu", "Ano po cyklostezce", "Záleží na měsíci"], ans: 0, fb: "Za snížené viditelnosti (noc, mlha) jsou světla povinná na celém území ČR." },
      { cat: "Mimo obec", q: "Je povoleno jezdit na kole po lesních cestách?", img: "🌲", opts: ["Jen na cestách k tomu určených nebo lesních průsecích", "Všude v lese", "Nikde v lese", "Záleží na vlastníkovi"], ans: 0, fb: "Jízda na kole v lese je povolena pouze na vyznačených cestách, cyklostezkách nebo při souhlasu vlastníka." },
      { cat: "Mimo obec", q: "Smí cyklista jet po poli nebo louce?", img: "🌾", opts: ["Jen po existujících polních cestách, ne přes plodiny", "Vždy", "Nikdy", "Jen v zimě"], ans: 0, fb: "Cyklista smí jet jen po existujících polních cestách, ne přímo po zemědělské půdě nebo plodinách." },
      { cat: "Mimo obec", q: "Co je značka 'Cyklotrasa' a musíš ji dodržovat?", img: "🚵", opts: ["Označená doporučená trasa – není povinná, ale orientační", "Povinná trasa", "Zákaz jízdy na kole", "Parkoviště pro kola"], ans: 0, fb: "Cyklotrasa je turistické značení doporučené trasy – není právně závazná, jen orientační." },
      { cat: "Mimo obec", q: "Co platí pro jízdu přes chráněné krajinné oblasti (CHKO)?", img: "🏞️", opts: ["Jen po označených cestách, vyhnout se chráněným biotopům", "Bez omezení", "Jízda na kole zakázána", "Jen v doprovodu průvodce"], ans: 0, fb: "V CHKO a národních parcích platí pravidla pro pohyb na území – kola jen na vyhrazených trasách." },
      { cat: "Mimo obec", q: "Jak má cyklista jezdit po silnici při setkání s protijedoucím autem?", img: "🚗", opts: ["Co nejblíže k pravému okraji, dát průjezdný prostor", "Zastavit vždy", "Jet doprostřed", "Dát světelné znamení"], ans: 0, fb: "Cyklista se přidrží pravého okraje a nechá auto projet bez ohrožení." },
      { cat: "Mimo obec", q: "Smí cyklista zastavit na krajnici silnice I. třídy?", img: "🛑", opts: ["Jen v nezbytném případě (porucha, nouzové zastavení)", "Vždy", "Nikdy", "Jen v noci"], ans: 0, fb: "Na silnici I. třídy a rychlostní komunikaci je zastavení povoleno jen v naléhavém případě." },
      { cat: "Mimo obec", q: "Musí cyklista platit mýtné na dálnici?", img: "💳", opts: ["Cyklisté na dálnice nesmí vůbec", "Ano, platí mýtné", "Ne, kola jezdí zdarma", "Záleží na kole"], ans: 0, fb: "Cyklisté nesmí na dálnice – jde o komunikaci vyhrazenou motorovým vozidlům." },
      { cat: "Mimo obec", q: "Jak má cyklista přejet nebezpečný terén (kořeny, štěrk)?", img: "🪨", opts: ["Zpomalit, stabilizovat kolo, přejet opatrně", "Zrychlit před překážkou", "Zastavit a nést kolo", "Jet zig-zag"], ans: 0, fb: "Na kluzkém nebo nestabilním povrchu je nutné zpomalit, sníží se tím riziko pádu." },
      { cat: "Mimo obec", q: "Co dělá cyklista, pokud ho předjíždí kamion?", img: "🚛", opts: ["Drží se pevně, zpomalí, drží co nejvíce vpravo", "Zrychlí", "Stočí se vlevo", "Troubí"], ans: 0, fb: "Při předjíždění kamionem může vzniknout silný vzduchový vír – je nutné pevně držet kolo a být co nejblíže vpravo." },
      { cat: "Mimo obec", q: "Je povoleno tábořit s kolem u cyklotrasy?", img: "⛺", opts: ["Jen na vyhrazených místech nebo se souhlasem vlastníka", "Vždy", "Nikdy", "Jen v národním parku"], ans: 0, fb: "Táboření je povoleno jen na vyhrazených místech nebo s povolením vlastníka pozemku." },
      { cat: "Mimo obec", q: "Jak správně přejet železniční přejezd na kole?", img: "🚂", opts: ["Pomalu, kolmo k kolejím, bez zastavení na kolejích", "Co nejrychleji", "Podél kolejí", "Záleží na vlaku"], ans: 0, fb: "Přejezd se přejíždí kolmo k kolejím, pomalu a nikdy se nezastavuje na kolejích." },
      { cat: "Mimo obec", q: "Smí cyklista jet přes soukromý pozemek?", img: "🏡", opts: ["Jen s povolením vlastníka", "Vždy má právo průjezdu", "Nikdy", "Jen po polní cestě"], ans: 0, fb: "Soukromý pozemek je mimo veřejně přístupné cesty zakázán bez souhlasu vlastníka." },
      { cat: "Mimo obec", q: "Co je to 'bikepacking' a platí pro něj jiná pravidla?", img: "🎒", opts: ["Cestování na kole s vybavením – platí stejná dopravní pravidla", "Zvláštní sport s výjimkami", "Závodní disciplína", "Jízda po neznačených trasách"], ans: 0, fb: "Bikepacking je forma cestování na kole s vybavením – dopravní pravidla jsou stejná jako pro každého cyklistu." },
      { cat: "Mimo obec", q: "Smí cyklista jet v noci bez reflexní vesty mimo obec?", img: "🦺", opts: ["Ne – reflexní vesta je povinná na vozovce mimo obec za snížené viditelnosti", "Ano", "Záleží na osvětlení kola", "Jen na cyklostezce"], ans: 0, fb: "Mimo obec je reflexní prvek (vesta nebo pásky) za snížené viditelnosti povinný." },
      { cat: "Mimo obec", q: "Jak by měl cyklista jet v mlze?", img: "🌫️", opts: ["Pomalu, se světly, v bezpečné vzdálenosti", "Rychle, aby mlhu opustil", "Bez světel aby neoslňoval", "Jen po chodníku"], ans: 0, fb: "V mlze je nutné jet velmi pomalu, se světly a udržovat bezpečnou vzdálenost." },
      { cat: "Mimo obec", q: "Smí cyklista jet rychlostí 60 km/h z kopce na silnici?", img: "⛰️", opts: ["Ano, pokud je to bezpečné a nepřekračuje místní omezení", "Ne, cyklista má limit 30 km/h", "Ne, limit 50 km/h", "Ano vždy bez omezení"], ans: 0, fb: "Pro cyklisty obecně platí maximální rychlost dle místního omezení a podmínek – nejsou omezeni na 30 km/h, pokud to místní situace nevyžaduje." },
      { cat: "Mimo obec", q: "Jak se cyklista chová k chodcům na úzké lesní cestě?", img: "🌳", opts: ["Zastaví nebo sjede stranou, chodcům dá přednost", "Chodci musí uhnout", "Záleží kdo přišel dříve", "Troubí a jede dál"], ans: 0, fb: "Cyklista musí dát pozor na chodce a v úzkém prostoru zastavit nebo sjet stranou." },
      { cat: "Mimo obec", q: "Kde se smí v ČR kempovat s kolem bez povolení?", img: "⛺", opts: ["Jen na vyznačených kempech nebo s povolením", "Kdekoliv v lese", "Kdekoliv mimo lesy", "Záleží na kraji"], ans: 0, fb: "Volné kempování mimo vyhrazená místa není v ČR povoleno bez souhlasu vlastníka pozemku." }
    ]
  },
  {
    id: 6,
    title: "Cyklistické světelné signály",
    desc: "Semafory, světla a situace za snížené viditelnosti.",
    emoji: "🚥",
    tags: ["Semafory", "Světla"],
    questions: [
      { cat: "Světelné signály", q: "Co znamená zelená na semaforu pro cyklistu?", img: "🟢", opts: ["Volno – lze jet", "Pozor – zpomalit", "Stůj", "Dej přednost"], ans: 0, fb: "Zelená = volno pro jízdu." },
      { cat: "Světelné signály", q: "Co znamená žlutá na semaforu?", img: "🟡", opts: ["Zastavit pokud jde bezpečně, nebo dokončit jízdu skrz křižovatku", "Jet rychle", "Ignorovat", "Jet opatrně libovolně"], ans: 0, fb: "Žlutá po zelené = zastavit, pokud je to bezpečné. Pokud je zastavení nebezpečné, lze křižovatku projet." },
      { cat: "Světelné signály", q: "Co znamená červená na semaforu?", img: "🔴", opts: ["Stůj – nelze jet", "Jet opatrně", "Dej přednost zprava", "Záleží na místě"], ans: 0, fb: "Červená vždy znamená stůj – ani cyklista nesmí jet." },
      { cat: "Světelné signály", q: "Co je blinkač (blikající žlutá) na semaforu?", img: "💛", opts: ["Pozor – řiď se předností v jízdě", "Jdi pomalu", "Stůj", "Volno pro cyklisty"], ans: 0, fb: "Blikající žlutá = semafor je mimo provoz. Řídi se normálními pravidly přednosti v jízdě." },
      { cat: "Světelné signály", q: "Smí cyklista reagovat na zelenou šipku semaforu (kondicionální)? 🔛", img: "↗️", opts: ["Ano, pokud je pro příslušný směr a bezpečno", "Ne, jen auta", "Jen tramvaje", "Záleží na místě"], ans: 0, fb: "Podmíněná zelená šipka platí i pro cyklisty – smí jet daným směrem." },
      { cat: "Světelné signály", q: "Existuje v ČR speciální cyklistický semafor (malý semafor s cyklistou)?", img: "🚦", opts: ["Ano, a cyklista se jím řídí", "Ne, cyklisté používají jen normální", "Jen v Praze", "Záleží na ulici"], ans: 0, fb: "Na některých místech jsou cyklosemafory – mají symbol kola a platí jen pro cyklisty." },
      { cat: "Světelné signály", q: "Cyklista projíždí na žlutou, ale nestihne zastavit – co se stane?", img: "🟡", opts: ["Může jet, pokud by zastavení bylo nebezpečné", "Musí vždy zastavit", "Dostane pokutu automaticky", "Záleží na policistovi"], ans: 0, fb: "Žlutá po zelené – pokud brzdit není bezpečné, lze křižovatku projet dokončením jízdy." },
      { cat: "Světelné signály", q: "Platí semafory pro chodce i pro cyklisty jedoucí přes přechod?", img: "🚶", opts: ["Jen pokud je cyklopřejezd se svým semaforem", "Vždy platí chodecký semafor", "Semafor neplatí pro kola vůbec", "Záleží na světě"], ans: 0, fb: "Cyklista se řídí semaforem pro vozidla, ne pro chodce – přes přechod musí sesednout a přejít." },
      { cat: "Světelné signály", q: "Co cyklista udělá když semafor nefunguje?", img: "⚡", opts: ["Chová se jako na neřízené křižovatce – pravidlo pravé ruky", "Projede vždy první", "Zastaví trvale", "Jet chodníkem"], ans: 0, fb: "Při nefunkčním semaforu platí pravidla neřízené křižovatky." },
      { cat: "Světelné signály", q: "Musí mít cyklista zapnutá světla i za dne?", img: "☀️", opts: ["V ČR: za dne mimo obec povinná přední i zadní světla od 2022", "Ne, jen v noci", "Jen za mlhy", "Záleží na kole"], ans: 0, fb: "Od roku 2022 jsou světla povinná pro cyklisty mimo obec i za dne." },
      { cat: "Světelné signály", q: "Smí cyklista signalizovat světlem (blikačkou) i místo ruky?", img: "💡", opts: ["Ne – ruční signál je stále povinný pro změnu směru", "Ano, světlo nahrazuje ruku", "Záleží na rychlosti", "Jen pro brzdění"], ans: 0, fb: "Zákon vyžaduje ruční signalizaci směru – světlo ji nenahrazuje, ale může doplňovat." },
      { cat: "Světelné signály", q: "Co je povinné pro viditelnost cyklisty za soumraku?", img: "🌅", opts: ["Zapnutá přední a zadní světla", "Jen reflexní vesta", "Jen přední světlo", "Jen zvonec"], ans: 0, fb: "Za snížené viditelnosti (soumrak, mlha, déšť) jsou povinná přední i zadní světla." },
      { cat: "Světelné signály", q: "Jak daleko musí být viditelné červené zadní světlo cyklisty?", img: "🔴", opts: ["Nejméně 50 metrů", "10 metrů", "100 metrů", "200 metrů"], ans: 0, fb: "Zadní červené světlo musí být viditelné nejméně na 50 metrů." },
      { cat: "Světelné signály", q: "Smí cyklista používat blikající světlo (strobe)?", img: "⚡", opts: ["Ano – blikací režim je povolen", "Ne, jen stálé světlo", "Jen za dne", "Záleží na frekvenci"], ans: 0, fb: "V ČR jsou povolena i blikací světla (LED) jako alternativa ke stálému osvětlení." },
      { cat: "Světelné signály", q: "Co je 'cyklistický stoplight' (bike specific signal)?", img: "🚦", opts: ["Semafor speciálně pro cyklisty s cyklistickým symbolem", "Semafor, které říká stop", "Světlo na kolo", "Závodní startér"], ans: 0, fb: "Bike specific signal je cyklosemafor vyhrazený jen pro cyklisty, s jejich vlastními fázemi." },
      { cat: "Světelné signály", q: "Co musí cyklista udělat, když přijíždí hasičský vůz se sirénou?", img: "🚒", opts: ["Uvolnit průjezd – zajet co nejdál vpravo nebo zastavit", "Jet rychleji", "Ignorovat", "Troubí"], ans: 0, fb: "Každý účastník provozu musí dát volnou dráhu záchranným vozidlům (hasiči, záchranná služba, policie)." },
      { cat: "Světelné signály", q: "Co cyklista udělá, pokud ho oslní protijedoucí auto světly?", img: "😵", opts: ["Zpomalí, zamíří pohled na pravý okraj vozovky, nesnaží se jet přímo", "Rozsvítí i přední světlo naplno", "Zastaví uprostřed silnice", "Zvedne ruku"], ans: 0, fb: "Při oslnění je nutné zpomalit a soustředit se na pravý okraj vozovky pro bezpečnou jízdu." },
      { cat: "Světelné signály", q: "Kde je zakázáno stát v záření světlometů protijedoucích vozidel?", img: "🚦", opts: ["Na světelné křižovatce bez přerušení červenou", "Kdekoliv v noci", "Jen na dálnici", "Nikde není zakázáno"], ans: 0, fb: "Stání na křižovatce přímo ve světlometém záření protijedoucích může být nebezpečné, je vhodné se mu vyhnout." },
      { cat: "Světelné signály", q: "Je povinné mít na kole odrazku i přes den?", img: "🔆", opts: ["Odrazky jsou povinné stále (i za dne), světla jen za snížené viditelnosti", "Odrazky jen v noci", "Odrazky nejsou povinné", "Záleží na kole"], ans: 0, fb: "Odrazky jsou povinné kdykoli, světla (aktivní) jen za snížené viditelnosti." },
      { cat: "Světelné signály", q: "Co je důležité pro správné umístění zadního červeného světla?", img: "🔦", opts: ["Vzadu na kole nebo cyklistovi, viditelné odzadu", "Vpředu vlevo", "Na helmu, doleva", "Záleží na zemi"], ans: 0, fb: "Zadní červené světlo musí být viditelné pro vozidla přijíždějící zezadu – umístění vzadu na kole nebo batohu." }
    ]
  },
  {
    id: 7,
    title: "Alkohol a kolo",
    desc: "Co říká zákon o alkoholu a kole?",
    emoji: "🍺",
    tags: ["Alkohol", "Zákon"],
    questions: [
      { cat: "Alkohol & Zákon", q: "Jaký je limit alkoholu v krvi pro cyklistu v ČR?", img: "🍺", opts: ["0,0 ‰ – nulová tolerance", "0,5 ‰", "1,0 ‰", "Žádný limit"], ans: 0, fb: "Pro cyklisty v ČR platí nulová tolerance alkoholu – 0,0 ‰." },
      { cat: "Alkohol & Zákon", q: "Co hrozí cyklistovi s alkoholem nad 1 ‰?", img: "👮", opts: ["Trestní oznámení za ohrožení pod vlivem", "Jen upozornění", "Jen pokuta do 1000 Kč", "Nic, kolo není auto"], ans: 0, fb: "Nad 1 ‰ se jedná o trestný čin ohrožení pod vlivem návykové látky." },
      { cat: "Alkohol & Zákon", q: "Může cyklista odmítnout dechovou zkoušku?", img: "💨", opts: ["Ne – odmítnutí je přestupek, jako by zkoušku nesplnil", "Ano bez následků", "Jen u policie na stanici", "Záleží na situaci"], ans: 0, fb: "Odmítnutí dechové zkoušky je přestupek – postihuje se stejně jako pozitivní výsledek." },
      { cat: "Alkohol & Zákon", q: "Platí pro cyklistu zákon o jízdě 'pod vlivem drog'?", img: "💊", opts: ["Ano – drogy jsou zakázány stejně jako alkohol", "Ne, jen alkohol", "Jen pro motoristy", "Záleží na droze"], ans: 0, fb: "Zákon o silničním provozu zakazuje jízdu pod vlivem jak alkoholu, tak jiných návykových látek." },
      { cat: "Alkohol & Zákon", q: "Může cyklista s alkoholem způsobit dopravní nehodu?", img: "💥", opts: ["Ano – a nese za ni právní odpovědnost", "Ne, cyklista nemůže způsobit nehodu", "Záleží na alkoholu", "Záleží na škodě"], ans: 0, fb: "Cyklista pod vlivem alkoholu může způsobit nehodu a nese právní odpovědnost." },
      { cat: "Alkohol & Zákon", q: "Kde v ČR se provádí silniční kontroly cyklistů?", img: "🚓", opts: ["Kdekoliv na veřejné komunikaci", "Jen na dálnicích", "Jen ve městech", "Záleží na policii"], ans: 0, fb: "Policie může kontrolovat cyklisty kdekoliv na veřejné pozemní komunikaci." },
      { cat: "Alkohol & Zákon", q: "Dostane cyklista s alkoholem bod do registru řidičů?", img: "📋", opts: ["Jen pokud má řidičský průkaz", "Vždy", "Nikdy", "Záleží na alkoholu"], ans: 0, fb: "Body se zapisují do registru řidičů – pokud cyklista řidičský průkaz nemá, body se nezapisují, ale trest platí." },
      { cat: "Alkohol & Zákon", q: "Jaká pokuta hrozí cyklistovi za jízdu s alkoholem 0,3 ‰?", img: "💰", opts: ["Pokuta až 20 000 Kč za přestupek", "Žádná – pod limitem", "Jen napomenutí", "Záleží na věku"], ans: 0, fb: "I 0,3 ‰ je přestupek – pokuta může dosáhnout až 20 000 Kč a zákaz řízení." },
      { cat: "Alkohol & Zákon", q: "Smí nezletilý cyklista jet s alkoholem?", img: "👦", opts: ["Ne – absolutní zákaz", "Do 0,5 ‰ smí", "Záleží na věku", "Záleží na rodiči"], ans: 0, fb: "Nezletilí mají absolutní zákaz alkoholu – jakákoliv hodnota je protizákonná." },
      { cat: "Alkohol & Zákon", q: "Co se stane, když cyklista pod vlivem alkoholu srazí chodce?", img: "🚑", opts: ["Trestní odpovědnost za ublížení na zdraví + přitěžující okolnost alkohol", "Nic extra", "Jen pokuta", "Záleží na chodci"], ans: 0, fb: "Alkohol je přitěžující okolností při trestném činu – hrozí výrazně vyšší trest." },
      { cat: "Alkohol & Zákon", q: "Platí limit alkoholu pro cyklistu i na soukromém pozemku?", img: "🏠", opts: ["Ne – zákon se vztahuje na veřejné komunikace", "Ano kdekoliv", "Záleží na zákoně", "Záleží na alkoholu"], ans: 0, fb: "Zákon o silničním provozu platí jen na veřejných komunikacích, ne na soukromém pozemku." },
      { cat: "Alkohol & Zákon", q: "Smí cyklista jet den po alkoholu?", img: "🌅", opts: ["Jen pokud alkohol zcela odbourán – 0,0 ‰", "Vždy – spánek odbourá vše", "Po 8 hodinách vždy ok", "Záleží na tělesné hmotnosti"], ans: 0, fb: "Alkohol se odbourává individuálně – jízdou je bezpečné až po kompletním odbourání na 0,0 ‰." },
      { cat: "Alkohol & Zákon", q: "Jaký je zákonný postup při kontrole cyklisty na alkohol?", img: "👮", opts: ["Policie odstaví cyklistu a provede orientační dechovou zkoušku", "Odvede na stanici hned", "Jen napíše protokol", "Cyklisty nemohou kontrolovat"], ans: 0, fb: "Policie provede orientační dechovou zkoušku na místě. Při pozitivním výsledku lékařské vyšetření." },
      { cat: "Alkohol & Zákon", q: "Může cyklista odmítnout lékařské vyšetření krve na alkohol?", img: "🩸", opts: ["Ne – odmítnutí je trestný čin", "Ano bez důsledků", "Jen v nemocnici", "Záleží na situaci"], ans: 0, fb: "Odmítnutí lékařského vyšetření na alkohol/drogy je samo o sobě trestným činem." },
      { cat: "Alkohol & Zákon", q: "Může cyklista s alkoholem vézt dítě v sedačce?", img: "👶", opts: ["Ne – ohrožení dítěte je přitěžující okolností", "Ano, pokud jede pomalu", "Záleží na věku dítěte", "Záleží na alkoholu"], ans: 0, fb: "Jízda pod vlivem s dítětem je zvlášť závažná – ohrožení dítěte je přitěžující okolností." },
      { cat: "Alkohol & Zákon", q: "Co je 'jízda pod vlivem' z pohledu zákona?", img: "⚖️", opts: ["Jízda, kdy jsou ovlivněny psychomotorické funkce alkoholem nebo drogami", "Jen jízda na 'opici'", "Jen alkohol nad 1 ‰", "Záleží na rychlosti"], ans: 0, fb: "Za jízdu pod vlivem se považuje jakékoli ovlivnění alkoholem nebo drogami, bez ohledu na naměřenou hodnotu." },
      { cat: "Alkohol & Zákon", q: "Co platí pro cyklistu, který způsobí nehodu pod vlivem alkoholu a ujede?", img: "🏃", opts: ["Trestný čin – neposkytnutí pomoci + jízda pod vlivem", "Jen jeden přestupek", "Záleží na škodě", "Záleží na alkoholu"], ans: 0, fb: "Útěk z místa nehody je sám o sobě trestný čin – v kombinaci s alkoholem výrazně přitěžuje." },
      { cat: "Alkohol & Zákon", q: "Může alkohol ovlivnit reakci cyklisty na brzdění?", img: "🛑", opts: ["Ano – prodlužuje reakční dobu a zhoršuje koordinaci", "Ne, jen motoristy", "Záleží na množství", "Záleží na tréninku"], ans: 0, fb: "Alkohol zpomaluje reflexy a zhoršuje koordinaci – cyklista reaguje pomaleji na nebezpečí." },
      { cat: "Alkohol & Zákon", q: "Může být cyklista za jízdu s alkoholem vyřazen ze silničního provozu?", img: "🚫", opts: ["Ano – může mu být uložen zákaz řízení všech motorových vozidel", "Ne, cyklista nemá řidičský průkaz", "Záleží na alkoholu", "Záleží na soudu"], ans: 0, fb: "Soud může uložit zákaz řízení motorových vozidel i cyklistovi potrestaném za alkohol." },
      { cat: "Alkohol & Zákon", q: "Je bezpečné jet na kole s 0,4 ‰ alkoholu?", img: "🍻", opts: ["Ne – i 0,4 ‰ je protizákonné a nebezpečné", "Ano, je to pod hranicí", "Záleží na zkušenostech", "Záleží na trase"], ans: 0, fb: "V ČR platí nulová tolerance – i 0,4 ‰ je přestupek a ovlivňuje schopnost bezpečné jízdy." }
    ]
  },
  {
    id: 8,
    title: "Pravidla pro děti na kole",
    desc: "Specifická pravidla pro nejmenší cyklisty.",
    emoji: "👦",
    tags: ["Děti", "Zákon"],
    questions: [
      { cat: "Děti & Kolo", q: "Do kolika let musí dítě nosit helmu při jízdě na kole?", img: "🪖", opts: ["Do 18 let", "Do 15 let", "Do 10 let", "Do 6 let"], ans: 0, fb: "Povinnost nosit helmu trvá do 18 let věku." },
      { cat: "Děti & Kolo", q: "Od kolika let smí dítě jet samo na silnici bez dospělého?", img: "🛣️", opts: ["Od 10 let", "Od 6 let", "Od 15 let", "Od 18 let"], ans: 0, fb: "Děti do 10 let smí na pozemní komunikaci jen v doprovodu osoby starší 18 let." },
      { cat: "Děti & Kolo", q: "Smí dítě do 10 let jet po chodníku?", img: "🚶", opts: ["Ano – děti do 10 let smí po chodníku", "Ne", "Jen se zvoncem", "Záleží na šířce chodníku"], ans: 0, fb: "Děti do 10 let smí jezdit na kole po chodníku, musí ale dávat přednost chodcům." },
      { cat: "Děti & Kolo", q: "Musí dospělý doprovázející dítě na kole taky nosit helmu?", img: "👨", opts: ["Ne, povinnost helmy se vztahuje jen na osoby do 18 let", "Ano, vždy", "Jen na silnici", "Záleží"], ans: 0, fb: "Zákon ukládá povinnost helmy jen osobám do 18 let – dospělý si může zvolit sám." },
      { cat: "Děti & Kolo", q: "Kde smí jet rodič s dítětem v sedačce na kole?", img: "👶", opts: ["Všude kde je jízda na kole povolena, v souladu s bezpečností", "Jen na cyklostezce", "Jen mimo město", "Záleží na hmotnosti dítěte"], ans: 0, fb: "Kolo s dítětem v sedačce smí jet kdekoliv, kde je kolo povoleno." },
      { cat: "Děti & Kolo", q: "Musí mít dětská sedačka na kole bezpečnostní pás?", img: "🔒", opts: ["Ano – sedačka musí mít zábrany a bezpečnostní pás", "Ne, stačí madla", "Záleží na věku", "Záleží na výrobci"], ans: 0, fb: "Zákon předpisuje, aby dětská sedačka byla vybavena prostředky k zajištění dítěte (pásek, zábrany noh)." },
      { cat: "Děti & Kolo", q: "Do kolika kg smí dítě v dětské sedačce za jízdou?", img: "⚖️", opts: ["Záleží na sedačce – obvykle do 22 kg", "Max. 10 kg", "Max. 30 kg", "Bez omezení"], ans: 0, fb: "Nosnost dětské sedačky je dána výrobcem – obvykle do 22 kg a věku 5–6 let." },
      { cat: "Děti & Kolo", q: "Smí dítě jet na kole v tmavém oblečení bez reflexních prvků?", img: "🌑", opts: ["Za snížené viditelnosti ne – reflexní prvky jsou doporučeny nebo povinny", "Vždy smí", "Záleží na věku", "Záleží na kole"], ans: 0, fb: "Dítě by mělo mít viditelné oblečení – reflexní prvky jsou povinné za snížené viditelnosti." },
      { cat: "Děti & Kolo", q: "Smí dítě řídit kolo s přívěsem?", img: "🛒", opts: ["Ne – přívěs smí vézt jen plnoletý nebo zkušený cyklista", "Ano od 10 let", "Záleží na přívěsu", "Záleží na rodiči"], ans: 0, fb: "Přívěs za kolo má svá pravidla a odpovědnost – mladé děti by ho řídit neměly." },
      { cat: "Děti & Kolo", q: "Musí dítě na odrážedle (balance bike) nosit helmu?", img: "🛴", opts: ["Zákon helmu pro odrážedla nevyžaduje, ale je silně doporučena", "Ano povinně do 18 let", "Jen na silnici", "Záleží na věku"], ans: 0, fb: "Odrážedlo (balance bike) není zákonem klasifikováno jako jízdní kolo – helma není povinná, ale doporučena." },
      { cat: "Děti & Kolo", q: "Smí dítě na kole jet bez dohledu v parku?", img: "🌳", opts: ["Ano v parku, kde je to povoleno", "Ne nikdy", "Záleží na věku", "Záleží na rodiči"], ans: 0, fb: "V parku (soukromém nebo veřejném prostoru mimo silnici) zákon nevyžaduje dohled na kole – odpovídá zákon o rodičovské péči." },
      { cat: "Děti & Kolo", q: "Jak by mělo být dítě oblečeno na kole?", img: "🧥", opts: ["Chrániče kolen/loktů a helma jsou silně doporučeny", "Stačí helma", "Záleží na počasí", "Záleží na rodiči"], ans: 0, fb: "Chrániče, helma a viditelné oblečení chrání dítě při pádu – jde o bezpečnostní doporučení." },
      { cat: "Děti & Kolo", q: "Kde je dítě na kole v sedačce nejbezpečněji umístěno?", img: "🪑", opts: ["Vzadu za sedlem rodiče – lépe pro stabilitu kola", "Vpředu na nosiči", "Na řidítkách", "V batohu"], ans: 0, fb: "Zadní sedačka je stabilnější a bezpečnější – přední sedačka může ovlivnit řiditelnost kola." },
      { cat: "Děti & Kolo", q: "Může být dítě přepravováno v přívěsném vozíku za kolo?", img: "🛒", opts: ["Ano, pokud vozík splňuje normy bezpečnosti", "Záleží na věku", "Záleží na rychlosti", "Záleží na silnici"], ans: 0, fb: "Dětský vozík za kolo je legální, musí mít ochrannou konstrukci, bezpečnostní pásy a splňovat normy." },
      { cat: "Děti & Kolo", q: "Smí škola organizovat cyklovýlet po silnici?", img: "🏫", opts: ["Ano, za podmínek bezpečnosti a s doprovodem", "Ne, děti nesmí na silnici", "Záleží na věku dětí", "Záleží na délce výletu"], ans: 0, fb: "Škola může organizovat cyklovýlety s odpovídajícím doprovodem a bezpečnostními opatřeními." },
      { cat: "Děti & Kolo", q: "Jaká je minimální věková hranice pro jízdu na silnici bez doprovodu?", img: "👶", opts: ["10 let", "6 let", "12 let", "15 let"], ans: 0, fb: "Zákon stanoví 10 let jako minimální věk pro samostatnou jízdu na pozemní komunikaci." },
      { cat: "Děti & Kolo", q: "Má dítě na kole povinnost znát dopravní pravidla?", img: "📚", opts: ["Ano – pravidla platí pro všechny bez ohledu na věk", "Ne do 15 let", "Záleží na rodičích", "Záleží na škole"], ans: 0, fb: "Dopravní pravidla platí pro každého účastníka silničního provozu – i dítě musí dodržovat základní pravidla." },
      { cat: "Děti & Kolo", q: "Co dělá rodič, pokud dítě na kole poruší pravidlo?", img: "👨‍👦", opts: ["Rodič nese zákonnou odpovědnost za nezletilé dítě", "Dítě odpovídá samo", "Záleží na věku", "Záleží na přestupku"], ans: 0, fb: "Za přestupky nezletilých odpovídají zákonní zástupci (rodiče/poručníci)." },
      { cat: "Děti & Kolo", q: "Je pro děti vhodné jezdit na kole na frekventované silnici?", img: "🛣️", opts: ["Ne – pro děti jsou vhodné cyklostezky a klidné ulice", "Ano s helmou", "Ano od 10 let", "Záleží na silnici"], ans: 0, fb: "Frekventované silnice jsou pro děti nebezpečné – bezpečnější jsou cyklostezky a klidné ulice." },
      { cat: "Děti & Kolo", q: "Co si musí dítě prohlédnout před každou jízdou na kole?", img: "🔍", opts: ["Stav brzd, nahuštění pneumatik, funkčnost světel a zvonku", "Jen helmu", "Jen pneumatiky", "Jen řetěz"], ans: 0, fb: "Bezpečnou jízdu zajišťuje pravidelná kontrola základní výbavy kola před každou jízdou." }
    ]
  },
  {
    id: 9,
    title: "Dopravní nehody a první pomoc",
    desc: "Co dělat po nehodě a jak pomoct?",
    emoji: "🚑",
    tags: ["Nehoda", "První pomoc"],
    questions: [
      { cat: "Nehoda", q: "Co musí cyklista udělat jako první po dopravní nehodě?", img: "🚑", opts: ["Zastavit a zajistit bezpečnost místa", "Volat média", "Odjet co nejdříve", "Nafotit kolo"], ans: 0, fb: "Po každé nehodě se musí zastavit, zajistit místo a poskytnout pomoc zraněným." },
      { cat: "Nehoda", q: "Na jaké číslo se volá záchranná služba v ČR?", img: "📞", opts: ["155", "112", "150", "158"], ans: 0, fb: "Záchranná služba je na čísle 155, hasiči 150, policie 158, tísňová linka 112." },
      { cat: "Nehoda", q: "Musí cyklista nahlásit nehodu s hmotnou škodou nad limit?", img: "📋", opts: ["Ano – škoda přesahující určitý limit se hlásí policii", "Ne, kolo není auto", "Záleží na škodě", "Záleží na zavinění"], ans: 0, fb: "Dopravní nehody s hmotnou škodou překračující zákonný limit (nebo zraněním) je nutné nahlásit policii." },
      { cat: "Nehoda", q: "Co je povinné při dopravní nehodě se zraněním?", img: "🩹", opts: ["Poskytnout nebo zajistit první pomoc a zavolat záchranku", "Počkat na policii", "Jen nafotit", "Jen zavolat pojišťovnu"], ans: 0, fb: "Povinnost poskytnout první pomoc je zákonná – neposkytnutí je trestným činem." },
      { cat: "Nehoda", q: "Co je nepřímá srdeční masáž?", img: "❤️", opts: ["Rytmické stlačování hrudníku pro udržení krevního oběhu", "Masáž srdce přes záda", "Stlačení hrudníku jednou rukou", "Zavazování ran"], ans: 0, fb: "KPR zahrnuje rytmické stlačování středu hrudníku frekvencí 100–120 /min, hloubka 5–6 cm." },
      { cat: "Nehoda", q: "Jak se správně provádí umělé dýchání?", img: "💨", opts: ["Záklon hlavy, uzavření nosu, fouknout do úst 2x, sledovat zvedání hrudníku", "Fouknout do nosu", "Jen stlačovat hrudník", "Záleží na zranění"], ans: 0, fb: "Umělé dýchání: záklon hlavy, uzavřít nos, vdechnout vzduch 2x do úst a sledovat pohyb hrudníku." },
      { cat: "Nehoda", q: "Jaký je poměr stlačení hrudníku a vdechů při KPR?", img: "🔢", opts: ["30 stlačení : 2 vdechy", "10 : 1", "15 : 2", "5 : 1"], ans: 0, fb: "Správný poměr KPR je 30 stlačení hrudníku a 2 umělé vdechy." },
      { cat: "Nehoda", q: "Co je AED (automatický defibrilátor)?", img: "⚡", opts: ["Přístroj pro obnovení srdečního rytmu elektrickým výbojem", "Obvazový materiál", "Kyslíková maska", "GPS záchranář"], ans: 0, fb: "AED (automatický externí defibrilátor) obnoví srdeční rytmus elektrickým výbojem – přístroj sám navádí uživatele." },
      { cat: "Nehoda", q: "Jak ošetříme krvácející ránu?", img: "🩸", opts: ["Přiložíme čistý obvaz nebo tkaninu a stiskneme, zvedneme končetinu", "Necháme volně krvácet", "Přiložíme led", "Vymyjeme vodou a necháme otevřenou"], ans: 0, fb: "Krvácení zastavíme tlakem čistého materiálu na ránu a zvednutím postižené části." },
      { cat: "Nehoda", q: "Co je stabilizovaná poloha (recovery position)?", img: "🛌", opts: ["Poloha na boku pro bezvědomou osobu, která dýchá", "Poloha na zádech", "Poloha vsedě", "Záleží na zranění"], ans: 0, fb: "Stabilizovaná poloha je poloha na boku pro osobu v bezvědomí, která dýchá – zabrání vdechnutí zvratků." },
      { cat: "Nehoda", q: "Smí se hýbat se zraněným po nehodě?", img: "🤕", opts: ["Jen pokud hrozí další nebezpečí (oheň, provoz)", "Vždy přesunout", "Nikdy", "Záleží na zranění"], ans: 0, fb: "Se zraněným se nesmí hýbat, pokud mu nehrozí přímé nebezpečí – pohyb může zhoršit poranění páteře." },
      { cat: "Nehoda", q: "Co je Rautekův manévr?", img: "👐", opts: ["Způsob vyndání zraněného z vozidla při zachování polohy páteře", "Způsob zástavy krvácení", "Druh KPR", "Způsob polohování bezvědomého"], ans: 0, fb: "Rautekův manévr je bezpečná technika vyndání zraněného z vozidla, která minimalizuje pohyb páteře." },
      { cat: "Nehoda", q: "Co je prioritní při první pomoci?", img: "❓", opts: ["Bezpečnost zachránce, pak kontrola vědomí zraněného", "Nejdříve volat médii", "Nejdříve fotografovat", "Záleží na situaci"], ans: 0, fb: "Zachránce musí nejdřív zajistit svou bezpečnost, pak zkontrolovat stav zraněného." },
      { cat: "Nehoda", q: "Jak poznáme, že někdo nedýchá?", img: "😵", opts: ["Nepohybuje se hrudník, necítíme vzduch u úst a nosu", "Má modré rty", "Záleží na situaci", "Jen bezvědomí"], ans: 0, fb: "Zástava dechu se pozná absence pohybu hrudníku a dechu u nosu/úst – zahajujeme KPR." },
      { cat: "Nehoda", q: "Jak zastavíme silné arteriální krvácení?", img: "🩸", opts: ["Turniket (zaškrcovadlo) nad místem krvácení, zapsat čas", "Jen tlak", "Zalít vodou", "Záleží na místě"], ans: 0, fb: "Silné arteriální (tepnové) krvácení zastavíme turniketem – zaznamená se čas přiložení." },
      { cat: "Nehoda", q: "Smí laik použít AED bez školení?", img: "⚡", opts: ["Ano – AED je navržen pro laiky a sám navede k použití", "Ne, jen záchranáři", "Jen s certifikátem", "Záleží na modelu"], ans: 0, fb: "AED je navržen tak, aby ho dokázal použít kdokoli – hlasové pokyny vedou zachránce celým procesem." },
      { cat: "Nehoda", q: "Jak ošetříme popáleninu?", img: "🔥", opts: ["Chladíme tekoucí vodou 10–20 minut, přikryjeme sterilně", "Máslem nebo olejem", "Ledovými kostkami", "Záleží na stupni"], ans: 0, fb: "Popáleninu chladíme vlažnou tekoucí vodou 10–20 minut – ne ledem, ne tukem." },
      { cat: "Nehoda", q: "Jak poznáme otřes mozku?", img: "🧠", opts: ["Nevolnost, zmatenost, bolest hlavy, výpadek paměti, závratě", "Jen ztráta vědomí", "Jen bolest hlavy", "Záleží na pádu"], ans: 0, fb: "Otřes mozku se projevuje nevolností, zmateností, bolestí hlavy, závratí nebo výpadkem paměti po nárazu." },
      { cat: "Nehoda", q: "Musíme při resuscitaci použít umělé dýchání?", img: "💨", opts: ["Při neochotě lze dělat jen srdeční masáž (hands-only CPR)", "Vždy nutné dýchání", "Ne, jen čekat na záchranáře", "Záleží na věku"], ans: 0, fb: "Pokud zachránce nechce nebo nemůže dělat umělé dýchání, pomůže i samotná srdeční masáž (hands-only CPR)." },
      { cat: "Nehoda", q: "Kdy ukončíme resuscitaci?", img: "⏱️", opts: ["Až přijede záchranná služba, nebo zraněný začne dýchat, nebo vyčerpáme síly", "Po 5 minutách", "Po 10 stlačeních", "Záleží"], ans: 0, fb: "KPR provádíme dokud zraněný nezačne dýchat, nepřijede záchranná služba nebo nás fyzicky nevyčerpá." }
    ]
  },
  {
    id: 10,
    title: "Pokročilé situace a kombinované otázky",
    desc: "Složitější situace z reálného provozu.",
    emoji: "🎓",
    tags: ["Pokročilé", "Mix"],
    questions: [
      { cat: "Pokročilé", q: "Cyklista A přijíždí zprava, auto B zprava. Kdo jede první?", img: "🔀", opts: ["Auto B přijíždí zprava od cyklisty A – auto jede první", "Cyklista jede první", "Záleží na rychlosti", "Záleží na velikosti"], ans: 0, fb: "Pravidlo pravé ruky: auto B přijíždí zprava od cyklisty A – auto má přednost." },
      { cat: "Pokročilé", q: "Cyklista jede na cyklistovi přímo do protisměru na úzké cestě. Jak se rozejdou?", img: "🔄", opts: ["Každý se přisune co nejvíce vpravo", "Cyklista vpředu má přednost", "Záleží kdo přijel dříve", "Záleží na šířce"], ans: 0, fb: "Každý jede co nejblíže ke svému pravému okraji, aby se bezpečně minuli." },
      { cat: "Pokročilé", q: "Na kruhovém objezdu – cyklista sjíždí. Auto vstupuje. Kdo má přednost?", img: "🔄", opts: ["Cyklista na objezdu má přednost", "Auto vstupující má přednost", "Záleží na značce", "Záleží na rychlosti"], ans: 0, fb: "Na kruhovém objezdu mají přednost vozidla již jedoucí na objezdu." },
      { cat: "Pokročilé", q: "Cyklista odbočuje vlevo. Chodec přechází zprava přes silnici. Kdo má přednost?", img: "🚶", opts: ["Záleží – chodec na přechodu má vždy přednost, jinak cyklista", "Chodec vždy", "Cyklista vždy", "Záleží na věku chodce"], ans: 0, fb: "Chodec na přechodu má přednost před každým vozidlem, mimo přechod se posoudí situace." },
      { cat: "Pokročilé", q: "Cyklista jede v noci bez světel po silnici. Je to přestupek?", img: "🌙", opts: ["Ano – nedostatek světel je přestupek s pokutou", "Ne, cyklisté nemusí mít světla", "Jen za mlhy", "Záleží na silnici"], ans: 0, fb: "Jízda bez světel za snížené viditelnosti je přestupek a hrozí pokuta." },
      { cat: "Pokročilé", q: "Co je to 'dead angle' (mrtvý úhel) u nákladních aut a jak ho cyklista využije?", img: "🚛", opts: ["Oblast kde kamion nevidí – cyklista se jí vyhýbá, nestojí vedle kabiny", "Místo pro bezpečné zastavení", "Prostor za kamionem", "Záleží na kamionu"], ans: 0, fb: "Mrtvý úhel kamionu je plocha, kde řidič nevidí. Cyklista by se mu měl vždy vyhýbat." },
      { cat: "Pokročilé", q: "Cyklista přejíždí přes koleje šikmo (pod malým úhlem). Jaké je riziko?", img: "🚃", opts: ["Kolo se může zaseknout do drážky – riziko pádu", "Žádné", "Záleží na kole", "Záleží na rychlosti"], ans: 0, fb: "Přejíždění kolejí pod malým úhlem hrozí zaseknutím pneumatiky do kolejnice – správně kolmo." },
      { cat: "Pokročilé", q: "Cyklista zaregistruje otevírání dveří auta zaparkovaného u obrubníku. Co udělá?", img: "🚗", opts: ["Zpomalí, ujede bezpečnou vzdálenost od aut ('doorzone')", "Zrychlí a projede", "Zatroubí a jede dál", "Zastaví vždy"], ans: 0, fb: "Dooring (zasažení otevíranými dveřmi) je nebezpečná situace – cyklista by měl jet 1–1,5 m od zaparkovaných aut." },
      { cat: "Pokročilé", q: "Na frekventované silnici je cyklista předjížděn autem. Auto se nezachová bezpečně. Co dělat?", img: "🚗", opts: ["Zaznamenat SPZ, zklidnit jízdu, hlásit policii při ohrožení", "Dohnat auto", "Zastavit uprostřed", "Zavolat hned"], ans: 0, fb: "Nebezpečné předjíždění lze nahlásit na policii. Cyklista by si měl zapamatovat nebo natočit SPZ." },
      { cat: "Pokročilé", q: "Jak cyklista pozná, že pneumatika jde pomalu do defektu?", img: "🔵", opts: ["Kolo začne táhnout do strany, zhorší se ovladatelnost", "Kolo jede rychleji", "Slyší prasknutí hned", "Záleží na pneumatice"], ans: 0, fb: "Pomalý defekt se projeví tažením kola do strany a zhoršenou ovladatelností – je nutné zastavit." },
      { cat: "Pokročilé", q: "Co je to 'wheelsuck' v pelotonu?", img: "🚴‍♂️", opts: ["Jízda těsně za jiným cyklistou ve vlivu jeho aerodynamiky", "Pád v závodě", "Technická závada", "Závodní taktika"], ans: 0, fb: "Wheelsuck/sání ve vleku je aerodynamická výhoda jízdy těsně za jiným cyklistou." },
      { cat: "Pokročilé", q: "Na sjezdu z kopce dostane cyklista 'speed wobble' (třesení kola). Co udělá?", img: "😱", opts: ["Pevně drží řidítka, plynule zpomalí zadní brzdou", "Zatočí prudce", "Brzdí jen přední brzdou", "Pustí řidítka"], ans: 0, fb: "Speed wobble se zvládá pevným stiskem řidítek a plynulým brzděním – prudké pohyby to zhorší." },
      { cat: "Pokročilé", q: "Co způsobí zablokování předního kola při prudkém brzdění?", img: "🛑", opts: ["Přetočení přes řidítka – 'endo'", "Zastavení bez pádu", "Jen zpomalení", "Záleží na rychlosti"], ans: 0, fb: "Zablokování přední brzdy při velké rychlosti může způsobit přetočení přes řidítka – je nutné dávkovat sílu." },
      { cat: "Pokročilé", q: "Cyklista v noci vidí za sebou auto s rozsvícenými světly blízko. Co udělá?", img: "🔦", opts: ["Přiblíží se co nejvíce k okraji, signalizuje popř. zastaví a pustí auto", "Zrychlí", "Zastaví uprostřed silnice", "Ignoruje"], ans: 0, fb: "Cyklista se přidrží co nejvíce vpravo, aby auto mohlo bezpečně předjet." },
      { cat: "Pokročilé", q: "Jak zjistí cyklista, zda je kolo správně seřízeno?", img: "🔧", opts: ["Zkontroluje brzdy, řazení, napnutí řetězu, tlak v pneumatikách", "Jen nafukuje", "Jen maže řetěz", "Záleží na kole"], ans: 0, fb: "Pravidelná kontrola brzd, řazení, řetězu a tlaku pneumatik zajistí bezpečnou a efektivní jízdu." },
      { cat: "Pokročilé", q: "Je e-bike (elektrokolo) považováno za motorové vozidlo?", img: "⚡", opts: ["Do 250W a 25 km/h není – jde o jízdní kolo s pomocným motorem", "Vždy motorové", "Záleží na výkonu a rychlosti", "Záleží na baterii"], ans: 2, fb: "E-bike do 250W s maximální asistencí 25 km/h je zákonem klasifikováno jako jízdní kolo – platí pro ně stejná pravidla. Výkonnější e-bikes jsou motorová vozidla." },
      { cat: "Pokročilé", q: "Co je hydroplaning (aquaplaning) u kola?", img: "💧", opts: ["Ztráta přilnavosti na mokré vozovce, kdy kolo 'pluje' na vodní vrstvě", "Jízda pod vodou", "Způsob mytí kola", "Záleží na pneumatice"], ans: 0, fb: "Aquaplaning nastane, když pneumatika nestačí odvádět vodu a 'pluje' na povrchu – nutné zpomalit." },
      { cat: "Pokročilé", q: "Cyklista jede v koloně 5 cyklistů. Jak jedou nejbezpečněji?", img: "👥", opts: ["Dva vedle sebe max., dostatečné rozestupy, světla zapnutá", "Všichni za sebou v jednom pruhu", "Každý jak chce", "Záleží na silnici"], ans: 0, fb: "Skupina max. ve dvou řadách s dostatečnými rozestupy a viditelnou výbavou je nejbezpečnější uspořádání." },
      { cat: "Pokročilé", q: "Jak by měl cyklista jezdit v mlze?", img: "🌫️", opts: ["Pomalu, se světly a reflektorem, v bezpečné vzdálenosti od ostatních", "Rychle aby mlhu opustil", "Bez světel aby neoslňoval", "Záleží na hustotě mlhy"], ans: 0, fb: "V mlze je nutné jet pomalu, se světly a v bezpečné vzdálenosti – zástavová vzdálenost se výrazně prodlužuje." },
      { cat: "Pokročilé", q: "Cyklista slyší za sebou houkačku záchranky. Co udělá?", img: "🚑", opts: ["Okamžitě sjedede co nejdál vpravo nebo zastaví a uvolní průjezd", "Zrychlí", "Ignoruje, jedou pro jiného", "Záleží na situaci"], ans: 0, fb: "Cyklista i každý jiný účastník provozu musí okamžitě uvolnit cestu záchranným vozidlům." }
    ]
  }
];

// ===== RENDER TEST CARDS =====
function renderTests() {
  const grid = document.getElementById('testsGrid');
  TESTS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'test-card';
    card.innerHTML = `
      <div class="test-card-top">
        <span class="test-number">${t.id < 10 ? '0' + t.id : t.id}</span>
        <span class="test-emoji">${t.emoji}</span>
      </div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <div class="test-meta">
        ${t.tags.map(tag => `<span class="test-tag">${tag}</span>`).join('')}
        <span class="test-tag orange">20 otázek</span>
      </div>
      <button class="test-btn" onclick="startTest(${t.id - 1})">Začít test →</button>
    `;
    grid.appendChild(card);
  });
}

// ===== QUIZ STATE =====
let currentTest = null;
let currentQ = 0;
let score = 0;
let answered = false;
let shuffledQuestions = [];
let shuffledOptIndices = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startTest(testIndex) {
  currentTest = TESTS[testIndex];
  currentQ = 0;
  score = 0;
  answered = false;

  // Shuffle question order
  shuffledQuestions = shuffle(currentTest.questions);
  // For each question pre-compute shuffled option mapping
  shuffledOptIndices = shuffledQuestions.map(q => shuffle(q.opts.map((_, i) => i)));

  document.getElementById('quizTitleLabel').textContent = currentTest.title;
  updateScoreDisplay();
  document.getElementById('quizOverlay').classList.add('active');
  renderQuestion();
}

function updateScoreDisplay() {
  const el = document.getElementById('quizScoreDisplay');
  if (!el) return;
  el.textContent = `✅ ${score} / ${shuffledQuestions.length}`;
}

function renderQuestion() {
  const q = shuffledQuestions[currentQ];
  const total = shuffledQuestions.length;
  const optOrder = shuffledOptIndices[currentQ];
  answered = false;

  const labels = ['A', 'B', 'C', 'D'];

  // Update header
  document.getElementById('quizProgressText').textContent = `Otázka ${currentQ + 1} / ${total}`;
  const pct = ((currentQ + 1) / total) * 100;
  document.getElementById('quizProgressFill').style.width = pct + '%';

  const hintsLeft = getHintsUnlocked ? getHintsUnlocked() : 0;

  document.getElementById('quizBody').innerHTML = `
    <div class="question-block">
      <div class="question-category">${q.cat}</div>
      ${q.img ? `<span class="question-img">${q.img}</span>` : ''}
      <p class="question-text">${q.q}</p>
      <div class="options-grid" id="optionsGrid">
        ${optOrder.map((origIdx, displayIdx) => `
          <button class="option-btn" onclick="selectAnswer(${displayIdx})">
            <span class="opt-label">${labels[displayIdx]}</span>${q.opts[origIdx]}
          </button>
        `).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <button class="hint-btn" id="hintBtn" onclick="useHint()" ${hintsLeft <= 0 ? 'disabled title="Žádné nápovědy – zahraj minihru!"' : ''}>
          💡 Nápověda ${hintsLeft > 0 ? `(${hintsLeft})` : '– zahraj minihru'}
        </button>
        ${hintsLeft <= 0 ? `<button class="hint-btn" style="background:rgba(255,214,0,0.08);border-color:rgba(255,214,0,0.3);color:var(--yellow)" onclick="showMiniGame(null)">🕹 Minihra pro nápovědu</button>` : ''}
      </div>
      <div class="hint-reveal" id="hintReveal" style="display:none"></div>
      <div class="feedback-box" id="feedbackBox"></div>
      <button class="quiz-next-btn" id="nextBtn" onclick="nextQuestion()">
        ${currentQ < total - 1 ? 'Další otázka → <span class="key-hint">[Enter]</span>' : 'Zobrazit výsledek 🏆'}
      </button>
    </div>
  `;
}

function selectAnswer(displayIndex) {
  if (answered) return;
  answered = true;

  const q = shuffledQuestions[currentQ];
  const optOrder = shuffledOptIndices[currentQ];
  const selectedOrigIndex = optOrder[displayIndex];
  const btns = document.querySelectorAll('.option-btn');
  const fb = document.getElementById('feedbackBox');
  const nextBtn = document.getElementById('nextBtn');

  btns.forEach(b => b.classList.add('disabled'));

  // Find which display index shows the correct original answer
  const correctDisplayIndex = optOrder.indexOf(q.ans);

  if (selectedOrigIndex === q.ans) {
    score++;
    btns[displayIndex].classList.add('correct');
    fb.className = 'feedback-box correct-fb show';
    fb.innerHTML = `✅ <strong>Správně!</strong> ${q.fb}`;
  } else {
    btns[displayIndex].classList.add('wrong');
    btns[correctDisplayIndex].classList.add('correct');
    fb.className = 'feedback-box wrong-fb show';
    fb.innerHTML = `❌ <strong>Špatně.</strong> Správná odpověď: <em>${q.opts[q.ans]}</em>. ${q.fb}`;
  }

  updateScoreDisplay();
  nextBtn.classList.add('show');
}

function useHint() {
  const q = shuffledQuestions[currentQ];
  const optOrder = shuffledOptIndices[currentQ];
  const correctDisplayIndex = optOrder.indexOf(q.ans);
  const labels = ['A', 'B', 'C', 'D'];
  const hints = getHintsUnlocked ? getHintsUnlocked() : 0;
  if (hints <= 0) { showToast('Žádné nápovědy! Zahraj minihru.', 'warn'); return; }

  // Spend a hint
  const user = getCurrentUser ? getCurrentUser() : null;
  if (user) {
    const accounts = getAccounts();
    if (accounts[user.username]) {
      accounts[user.username].hintsUnlocked = Math.max(0, (accounts[user.username].hintsUnlocked || 0) - 1);
      saveAccounts(accounts);
    }
  }

  const hintReveal = document.getElementById('hintReveal');
  hintReveal.style.display = 'block';
  hintReveal.textContent = `💡 Správná odpověď je: ${labels[correctDisplayIndex]}`;
  document.getElementById('hintBtn').disabled = true;
  document.getElementById('hintBtn').textContent = '💡 Nápověda použita';
}

function showToast(msg, type = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function nextQuestion() {
  const total = shuffledQuestions.length;
  if (currentQ < total - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quizOverlay').classList.remove('active');
  const total = shuffledQuestions.length;
  const pct = Math.round((score / total) * 100);

  // Save score
  if (typeof saveScore === 'function') saveScore(currentTest.id, score, total);

  let icon = '😢', title = 'Nevzdávej to!', msg = 'Opakuj si pravidla a zkus to znovu.';
  if (pct >= 90) { icon = '🏆'; title = 'Výborně!'; msg = 'Jsi dopravní expert! Bezpečnost na silnici máš v malíčku.'; }
  else if (pct >= 70) { icon = '😊'; title = 'Dobře!'; msg = 'Znáš pravidla dobře, ale ještě je co zlepšovat.'; }
  else if (pct >= 50) { icon = '😐'; title = 'Ujde to.'; msg = 'Průměrný výsledek. Zopakuj si nejslabší oblasti.'; }

  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScore').textContent = `${score} / ${total} správně (${pct}%)`;
  document.getElementById('resultMsg').textContent = msg;

  const overlay = document.getElementById('resultOverlay');
  overlay.classList.add('active');

  setTimeout(() => {
    document.getElementById('resultBar').style.width = pct + '%';
  }, 100);
}

// ===== RESULT BUTTONS =====
document.getElementById('retryBtn').addEventListener('click', () => {
  document.getElementById('resultOverlay').classList.remove('active');
  startTest(currentTest.id - 1);
});

document.getElementById('backBtn').addEventListener('click', () => {
  document.getElementById('resultOverlay').classList.remove('active');
  document.getElementById('testy').scrollIntoView({ behavior: 'smooth' });
});

// ===== KEYBOARD SHORTCUT =====
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn && nextBtn.classList.contains('show')) {
      e.preventDefault();
      nextQuestion();
    }
  }
  // Number keys 1-4 to select answers
  if (['1','2','3','4'].includes(e.key)) {
    const idx = parseInt(e.key) - 1;
    const btns = document.querySelectorAll('.option-btn');
    if (btns[idx] && !answered) btns[idx].click();
  }
});

// ===== CLOSE QUIZ =====
document.getElementById('quizClose').addEventListener('click', () => {
  document.getElementById('quizOverlay').classList.remove('active');
});

// ===== NAV ACTIVE STATE =====
const sections = document.querySelectorAll('section[id], footer[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

document.getElementById('menuTesty').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('testy').scrollIntoView({ behavior: 'smooth' });
});

// ===== INIT =====
renderTests();
