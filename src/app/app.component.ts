import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WorldBankService } from './world-bank/world-bank.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [WorldBankService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'javascript-final';
  countryInfo: string = 'Hover over a country to see data';
  countries: any[] = [];

  constructor(private worldBankService: WorldBankService) {}

  private countryCodeMapping: { [key: string]: string } = {
    'af': 'AFG', // Afghanistan
    'al': 'ALB', // Albania
    'dz': 'DZA', // Algeria
    'as': 'ASM', // American Samoa
    'ad': 'AND', // Andorra
    'ao': 'AGO', // Angola
    'ai': 'AIA', // Anguilla
    'ag': 'ATG', // Antigua and Barbuda
    'ar': 'ARG', // Argentina
    'am': 'ARM', // Armenia
    'aw': 'ABW', // Aruba
    'au': 'AUS', // Australia
    'at': 'AUT', // Austria
    'az': 'AZE', // Azerbaijan
    'bs': 'BHS', // Bahamas
    'bh': 'BHR', // Bahrain
    'bd': 'BGD', // Bangladesh
    'bb': 'BRB', // Barbados
    'by': 'BLR', // Belarus
    'be': 'BEL', // Belgium
    'bz': 'BLZ', // Belize
    'bj': 'BEN', // Benin
    'bm': 'BMU', // Bermuda
    'bt': 'BTN', // Bhutan
    'bo': 'BOL', // Bolivia
    'ba': 'BIH', // Bosnia and Herzegovina
    'bw': 'BWA', // Botswana
    'br': 'BRA', // Brazil
    'io': 'IOT', // British Indian Ocean Territory
    'bn': 'BRN', // Brunei Darussalam
    'bg': 'BGR', // Bulgaria
    'bf': 'BFA', // Burkina Faso
    'bi': 'BDI', // Burundi
    'cv': 'CPV', // Cabo Verde
    'kh': 'KHM', // Cambodia
    'cm': 'CMR', // Cameroon
    'ca': 'CAN', // Canada
    'ky': 'CYM', // Cayman Islands
    'cf': 'CAF', // Central African Republic
    'td': 'TCD', // Chad
    'cl': 'CHL', // Chile
    'cn': 'CHN', // China
    'cx': 'CXR', // Christmas Island
    'cc': 'CCK', // Cocos (Keeling) Islands
    'co': 'COL', // Colombia
    'km': 'COM', // Comoros
    'cd': 'COD', // Congo, Dem. Rep.
    'cg': 'COG', // Congo, Rep.
    'ck': 'COK', // Cook Islands
    'cr': 'CRI', // Costa Rica
    'hr': 'HRV', // Croatia
    'cu': 'CUB', // Cuba
    'cw': 'CUW', // Curaçao
    'cy': 'CYP', // Cyprus
    'cz': 'CZE', // Czech Republic
    'dk': 'DNK', // Denmark
    'dj': 'DJI', // Djibouti
    'dm': 'DMA', // Dominica
    'do': 'DOM', // Dominican Republic
    'ec': 'ECU', // Ecuador
    'eg': 'EGY', // Egypt
    'sv': 'SLV', // El Salvador
    'gq': 'GNQ', // Equatorial Guinea
    'er': 'ERI', // Eritrea
    'ee': 'EST', // Estonia
    'et': 'ETH', // Ethiopia
    'fj': 'FJI', // Fiji
    'fi': 'FIN', // Finland
    'fr': 'FRA', // France
    'gf': 'GUF', // French Guiana
    'pf': 'PYF', // French Polynesia
    'ga': 'GAB', // Gabon
    'gm': 'GMB', // Gambia
    'ge': 'GEO', // Georgia
    'de': 'DEU', // Germany
    'gh': 'GHA', // Ghana
    'gi': 'GIB', // Gibraltar
    'gr': 'GRC', // Greece
    'gl': 'GRL', // Greenland
    'gd': 'GRD', // Grenada
    'gp': 'GLP', // Guadeloupe
    'gu': 'GUM', // Guam
    'gt': 'GTM', // Guatemala
    'gg': 'GGY', // Guernsey
    'gn': 'GIN', // Guinea
    'gw': 'GNB', // Guinea-Bissau
    'gy': 'GUY', // Guyana
    'ht': 'HTI', // Haiti
    'hm': 'HMD', // Heard Island and McDonald Islands
    'va': 'VAT', // Holy See
    'hn': 'HND', // Honduras
    'hk': 'HKG', // Hong Kong
    'hu': 'HUN', // Hungary
    'is': 'ISL', // Iceland
    'in': 'IND', // India
    'id': 'IDN', // Indonesia
    'ir': 'IRN', // Iran
    'iq': 'IRQ', // Iraq
    'ie': 'IRL', // Ireland
    'im': 'IMN', // Isle of Man
    'il': 'ISR', // Israel
    'it': 'ITA', // Italy
    'jm': 'JAM', // Jamaica
    'jp': 'JPN', // Japan
    'je': 'JEY', // Jersey
    'jo': 'JOR', // Jordan
    'kz': 'KAZ', // Kazakhstan
    'ke': 'KEN', // Kenya
    'ki': 'KIR', // Kiribati
    'kp': 'PRK', // Korea, Dem. Rep.
    'kr': 'KOR', // Korea, Rep.
    'kw': 'KWT', // Kuwait
    'kg': 'KGZ', // Kyrgyz Republic
    'la': 'LAO', // Lao PDR
    'lv': 'LVA', // Latvia
    'lb': 'LBN', // Lebanon
    'ls': 'LSO', // Lesotho
    'lr': 'LBR', // Liberia
    'ly': 'LBY', // Libya
    'li': 'LIE', // Liechtenstein
    'lt': 'LTU', // Lithuania
    'lu': 'LUX', // Luxembourg
    'mo': 'MAC', // Macao
    'mg': 'MDG', // Madagascar
    'mw': 'MWI', // Malawi
    'my': 'MYS', // Malaysia
    'mv': 'MDV', // Maldives
    'ml': 'MLI', // Mali
    'mt': 'MLT', // Malta
    'mh': 'MHL', // Marshall Islands
    'mq': 'MTQ', // Martinique
    'mr': 'MRT', // Mauritania
    'mu': 'MUS', // Mauritius
    'yt': 'MYT', // Mayotte
    'mx': 'MEX', // Mexico
    'fm': 'FSM', // Micronesia
    'md': 'MDA', // Moldova
    'mc': 'MCO', // Monaco
    'mn': 'MNG', // Mongolia
    'me': 'MNE', // Montenegro
    'ma': 'MAR', // Morocco
    'mz': 'MOZ', // Mozambique
    'mm': 'MMR', // Myanmar
    'na': 'NAM', // Namibia
    'nr': 'NRU', // Nauru
    'np': 'NPL', // Nepal
    'nl': 'NLD', // Netherlands
    'nc': 'NCL', // New Caledonia
    'nz': 'NZL', // New Zealand
    'ni': 'NIC', // Nicaragua
    'ne': 'NER', // Niger
    'ng': 'NGA', // Nigeria
    'nu': 'NIU', // Niue
    'nf': 'NFK', // Norfolk Island
    'mp': 'MNP', // Northern Mariana Islands
    'no': 'NOR', // Norway
    'om': 'OMN', // Oman
    'pk': 'PAK', // Pakistan
    'pw': 'PLW', // Palau
    'ps': 'PSE', // Palestine
    'pa': 'PAN', // Panama
    'pg': 'PNG', // Papua New Guinea
    'py': 'PRY', // Paraguay
    'pe': 'PER', // Peru
    'ph': 'PHL', // Philippines
    'pn': 'PCN', // Pitcairn Islands
    'pl': 'POL', // Poland
    'pt': 'PRT', // Portugal
    'pr': 'PRI', // Puerto Rico
    'qa': 'QAT', // Qatar
    're': 'REU', // Réunion
    'ro': 'ROU', // Romania
    'ru': 'RUS', // Russia
    'rw': 'RWA', // Rwanda
    'bl': 'BLM', // Saint Barthélemy
    'sh': 'SHN', // Saint Helena
    'kn': 'KNA', // Saint Kitts and Nevis
    'lc': 'LCA', // Saint Lucia
    'mf': 'MAF', // Saint Martin (French part)
    'pm': 'SPM', // Saint Pierre and Miquelon
    'vc': 'VCT', // Saint Vincent and the Grenadines
    'ws': 'WSM', // Samoa
    'sm': 'SMR', // San Marino
    'st': 'STP', // Sao Tome and Principe
    'sa': 'SAU', // Saudi Arabia
    'sn': 'SEN', // Senegal
    'rs': 'SRB', // Serbia
    'sc': 'SYC', // Seychelles
    'sl': 'SLE', // Sierra Leone
    'sg': 'SGP', // Singapore
    'sx': 'SXM', // Sint Maarten (Dutch part)
    'sk': 'SVK', // Slovakia
    'si': 'SVN', // Slovenia
    'sb': 'SLB', // Solomon Islands
    'so': 'SOM', // Somalia
    'za': 'ZAF', // South Africa
    'gs': 'SGS', // South Georgia and the South Sandwich Islands
    'ss': 'SSD', // South Sudan
    'es': 'ESP', // Spain
    'lk': 'LKA', // Sri Lanka
    'sd': 'SDN', // Sudan
    'sr': 'SUR', // Suriname
    'sz': 'SWZ', // Swaziland
    'se': 'SWE', // Sweden
    'ch': 'CHE', // Switzerland
    'sy': 'SYR', // Syrian Arab Republic
    'tw': 'TWN', // Taiwan
    'tj': 'TJK', // Tajikistan
    'tz': 'TZA', // Tanzania
    'th': 'THA', // Thailand
    'tl': 'TLS', // Timor-Leste
    'tg': 'TGO', // Togo
    'tk': 'TKL', // Tokelau
    'to': 'TON', // Tonga
    'tt': 'TTO', // Trinidad and Tobago
    'tn': 'TUN', // Tunisia
    'tr': 'TUR', // Turkey
    'tm': 'TKM', // Turkmenistan
    'tv': 'TUV', // Tuvalu
    'ug': 'UGA', // Uganda
    'ua': 'UKR', // Ukraine
    'ae': 'ARE', // United Arab Emirates
    'gb': 'GBR', // United Kingdom
    'us': 'USA', // United States
    'uy': 'URY', // Uruguay
    'uz': 'UZB', // Uzbekistan
    'vu': 'VUT', // Vanuatu
    've': 'VEN', // Venezuela
    'vn': 'VNM', // Vietnam
    'wf': 'WLF', // Wallis and Futuna
    'eh': 'ESH', // Western Sahara
    'ye': 'YEM', // Yemen
    'zm': 'ZMB', // Zambia
    'zw': 'ZWE', // Zimbabwe
  };


  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries() {
    this.worldBankService.getCountries().subscribe({
      next: (data) => {
        this.countries = data[1];
        console.log('Countries fetched:', this.countries);
      },
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  onCountryHover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const countryCode = target.getAttribute('id')?.toUpperCase();
    const countryName = target.getAttribute('name');

    if (countryCode && countryName) {
      this.countryInfo = `Loading data for ${countryName}`;
      this.getCountryData(countryCode, countryName);
    }
  }

  onCountryLeave() {
    this.countryInfo = 'Hover over a country to see data';
  }

  getCountryData(countryCode: string, countryName: string) {
    forkJoin({
      metadata: this.worldBankService.getCountryMetadata(countryCode),
      indicators: this.worldBankService.getCountryData(countryCode)
    }).subscribe({
      next: ({ metadata, indicators }) => {
        // metadata
        const countryMetadata = metadata[1] && metadata[1][0] ? metadata[1][0] : null;
        const incomeLevel = countryMetadata?.incomeLevel?.value || 'N/A';
        const capital = countryMetadata?.capitalCity || 'N/A';
        const region = countryMetadata?.region?.value || 'N/A';
  
        // indicators
        const populationData = indicators[1]?.find((entry: any) => entry.indicator.id === 'SP.POP.TOTL');
        const population = populationData?.value || 'N/A';
  
        // Update countryInfo after fork
        this.countryInfo = `
        Country: ${countryName}<br>
        Capital: ${capital}<br>
        Region: ${region}<br>
        Income Level: ${incomeLevel}<br>
        Population: ${population}<br>
        Country ID: ${countryCode}
        `;
  
        // Log for debugging
        console.log(`Country Data for ${countryName}`, {
          IncomeLevel: incomeLevel,
          Capital: capital,
          Region: region,
          Population: population
        });
      },
      error: (err) => {
        console.error(`Error fetching data for ${countryName}`, err);
        this.countryInfo = `No data available for ${countryName}`;
      }
    });
  }
}