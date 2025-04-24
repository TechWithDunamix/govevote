// Anambra State only
export const nigeriaStates = ["Anambra"]

// LGAs in Anambra
const lgasByState: Record<string, string[]> = {
  Anambra: [
    "Aguata",
    "Anambra East",
    "Anambra West",
    "Anaocha",
    "Awka North",
    "Awka South",
    "Ayamelum",
    "Dunukofia",
    "Ekwusigo",
    "Idemili North",
    "Idemili South",
    "Ihiala",
    "Njikoka",
    "Nnewi North",
    "Nnewi South",
    "Ogbaru",
    "Onitsha North",
    "Onitsha South",
    "Orumba North",
    "Orumba South",
    "Oyi",
  ],
}

// Wards for each LGA in Anambra
const wardsByLGA: Record<string, Record<string, string[]>> = {
  Anambra: {
    Aguata: [
      "Achina",
      "Aguluezechukwu",
      "Amesi",
      "Akpo/Umuchu",
      "Ekwulobia",
      "Ezinifite",
      "Igbo-Ukwu",
      "Ikenga",
      "Isuofia",
      "Nkpologwu",
      "Ora-Eri",
      "Umuona",
    ],
    "Anambra East": [
      "Aguleri",
      "Enugwu Otu",
      "Eziagulu Otu",
      "Igbariam",
      "Nando",
      "Nsugbe",
      "Otuocha",
      "Umueri",
      "Umuleri",
    ],
    "Anambra West": ["Ezi Anam", "Ifite Anam", "Nzam", "Olumbanasa", "Oroma-Etiti", "Umueze Anam"],
    Anaocha: ["Adazi-Ani", "Adazi-Enu", "Adazi-Nnukwu", "Agulu", "Aguluzigbo", "Ichida", "Neni", "Nri", "Obeledu"],
    "Awka North": [
      "Achalla",
      "Amansea",
      "Amanuke",
      "Awba-Ofemili",
      "Ebenebe",
      "Isuaniocha",
      "Mgbakwu",
      "Ugbene",
      "Ugbenu",
    ],
    "Awka South": ["Amawbia", "Awka", "Ezinato", "Isiagu", "Mbaukwu", "Nibo", "Nise", "Okpuno", "Umuawulu"],
    Ayamelum: ["Anaku", "Ifite-Ogwari", "Igbakwu", "Omasi", "Omor", "Umumbo", "Umuerum", "Umueje"],
    Dunukofia: ["Ifitedunu", "Nawfia", "Nawgu", "Ukpo", "Ukwulu", "Umunnachi"],
    Ekwusigo: ["Ichi", "Ihembosi", "Oraifite", "Ozubulu"],
    "Idemili North": [
      "Abacha",
      "Abatete",
      "Eziowelle",
      "Ideani",
      "Nkpor",
      "Obosi",
      "Ogidi",
      "Oraukwu",
      "Uke",
      "Umuoji",
    ],
    "Idemili South": ["Akwukwu", "Alor", "Awka-Etiti", "Nnobi", "Nnokwa", "Ojoto", "Oba"],
    Ihiala: ["Amorka", "Azia", "Ihiala", "Iseke", "Lilu", "Mbosi", "Okija", "Orsumoghu", "Uli"],
    Njikoka: ["Abagana", "Abba", "Enugwu-Agidi", "Enugwu-Ukwu", "Nawfia", "Nimo"],
    "Nnewi North": ["Nnewi-Ichi", "Otolo", "Umudim", "Uruagu", "Nnewichi"],
    "Nnewi South": [
      "Akwaihedi",
      "Amichi",
      "Azigbo",
      "Ebenator",
      "Ekwulumili",
      "Ezinifite",
      "Osumenyi",
      "Ukpor",
      "Unubi",
      "Utuh",
    ],
    Ogbaru: [
      "Akili-Ogidi",
      "Akili-Ozizor",
      "Atani",
      "Ochuche",
      "Odekpe",
      "Ogbakuba",
      "Ogwu-Aniocha",
      "Ogwu-Ikpele",
      "Ohita",
      "Okpoko",
      "Ossomala",
    ],
    "Onitsha North": ["Inland Town", "GRA", "Odoakpu", "Omagba", "American Quarters", "Trans-Nkisi", "Otu-Onitsha"],
    "Onitsha South": [
      "Fegge",
      "Odoakpu",
      "Onitsha Waterside",
      "Harbour Industrial Layout",
      "Bridge Head Market",
      "Upper Iweka",
      "Modebe Avenue",
    ],
    "Orumba North": ["Ajalli", "Amaokpala", "Awgbu", "Nanka", "Ndikelionwu", "Ndiowu", "Ndiukwuenu", "Oko", "Ufuma"],
    "Orumba South": ["Akpu", "Ezira", "Isulo", "Nawfija", "Nkerehi", "Ogbunka", "Owerre-Ezukala", "Umunze", "Umuomaku"],
    Oyi: ["Awkuzu", "Nteje", "Nkwelle-Ezunaka", "Ogbunike", "Umunya", "Umumbo"],
  },
}

// Polling units for each ward in Anambra (simplified for demo)
const pollingUnitsByWard: Record<string, Record<string, Record<string, string[]>>> = {
  Anambra: {
    "Awka South": {
      Awka: [
        "Agu-Awka Primary School",
        "Awka Central School",
        "Aroma Junction",
        "Government House",
        "Unizik Junction",
        "Amaku Hospital",
        "Eke Awka Market",
        "Finotel Junction",
        "Regina Caeli Junction",
        "Zik Avenue",
      ],
      Amawbia: [
        "Amawbia Town Hall",
        "Amawbia Primary School",
        "Amawbia Junction",
        "Ngozika Estate",
        "Anambra State Assembly",
      ],
      Nibo: ["Nibo Central School", "Nibo Market Square", "Nibo Town Hall", "Nibo Health Center"],
    },
    "Onitsha North": {
      "Inland Town": ["Onitsha High School", "CKC Onitsha", "Ime Obi Palace", "Ogboli Road", "Modebe Avenue"],
      GRA: ["GRA Primary School", "Dennis Memorial School", "All Saints Cathedral", "Onitsha Club"],
    },
    "Nnewi North": {
      Otolo: [
        "Nkwo Nnewi Market",
        "Otolo Central School",
        "Nnamdi Azikiwe University Teaching Hospital",
        "Nnewi High School",
        "Nnewi Civic Center",
      ],
      Uruagu: ["Uruagu Primary School", "Uruagu Market", "Uruagu Health Center", "Uruagu Town Hall"],
    },
  },
}

// Senatorial zones in Anambra
const senatorialZonesByState: Record<string, string[]> = {
  Anambra: ["Anambra North", "Anambra Central", "Anambra South"],
}

// Helper functions to get data
export function getLGAs(state: string): string[] {
  return lgasByState[state] || []
}

export function getWards(state: string, lga: string): string[] {
  return (wardsByLGA[state] && wardsByLGA[state][lga]) || []
}

export function getSenatorialZones(state: string): string[] {
  return senatorialZonesByState[state] || []
}

export function getPollingUnits(state: string, lga: string, ward: string): string[] {
  return (pollingUnitsByWard[state] && pollingUnitsByWard[state][lga] && pollingUnitsByWard[state][lga][ward]) || []
}
