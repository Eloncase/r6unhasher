# r6unhasher

A simple service which redirects you to a proper R6S json file

## Requirments

You will need to install dependencies first.
```bash
npm install
```

## Usage

You should be good to go. Simply run
```bash
npm start
```

You can also specify port, default is `9850`
```bash
npm start 9840
```

## How it works

Server is updating hashes every hour by the following algorithm:
 * downloads html from `https://game-rainbow6.ubi.com/`
 * parses it for js files (e.g. `assets/scripts/main.<hash>.js`, `assets/scripts/vendor.<hash>.js`)
 * downloads those scripts
 * parses them for json files (e.g. `assets/data/operators.<hash>.json`, `assets/data/weapons.<hash>.json`, `assets/locales/locale.<lang_tag>.<hash>.json`)

## Example responses

Just specify json name and you will be redirected e.g.:
* `/ranks` -> `https://game-rainbow6.ubi.com/assets/data/ranks.c2baadef.json`
* `/operators` -> `https://game-rainbow6.ubi.com/assets/data/operators.a45bd7c1.json`
* `/locale` -> `https://game-rainbow6.ubi.com/assets/locales/locale.en-us.32a22eb2.json`

Default locale is `en-us`, you can specify different locale by passing `l=<lang-tag>` e.g.:
* `/locale?l=ru-ru` -> `https://game-rainbow6.ubi.com/assets/locales/locale.ru-ru.cd167fa1.json`

If you specify not-existing locale it will alawys fallback to `en-us`

Request to `/` or `/hash` will return all parsed json files

```json
{
  "unlocalized": {
    "data": {
      "ranks": {
        "hash": "c2baadef",
        "url": "https://game-rainbow6.ubi.com/assets/data/ranks.c2baadef.json"
      },
      "seasons": {
        "hash": "11bfe9f0",
        "url": "https://game-rainbow6.ubi.com/assets/data/seasons.11bfe9f0.json"
      },
      "operators": {
        "hash": "a45bd7c1",
        "url": "https://game-rainbow6.ubi.com/assets/data/operators.a45bd7c1.json"
      },
      "weapons": {
        "hash": "8a9b3d9e",
        "url": "https://game-rainbow6.ubi.com/assets/data/weapons.8a9b3d9e.json"
      },
      "rewards": {
        "hash": "99e8723c",
        "url": "https://game-rainbow6.ubi.com/assets/data/rewards.99e8723c.json"
      }
    }
  },
  "localized": {
    "locales": {
      "locale": {
        "cs-cz": {
          "hash": "3002ab6a",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.cs-cz.3002ab6a.json"
        },
        "de-de": {
          "hash": "450f7436",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.de-de.450f7436.json"
        },
        "en-us": {
          "hash": "32a22eb2",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.en-us.32a22eb2.json"
        },
        "es-es": {
          "hash": "d6ff48d7",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.es-es.d6ff48d7.json"
        },
        "es-mx": {
          "hash": "fcc5bff7",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.es-mx.fcc5bff7.json"
        },
        "fr-fr": {
          "hash": "7696e53e",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.fr-fr.7696e53e.json"
        },
        "it-it": {
          "hash": "79d99902",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.it-it.79d99902.json"
        },
        "ja-jp": {
          "hash": "8b39ed81",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.ja-jp.8b39ed81.json"
        },
        "ko-kr": {
          "hash": "1853644a",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.ko-kr.1853644a.json"
        },
        "nl-nl": {
          "hash": "0128d091",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.nl-nl.0128d091.json"
        },
        "pl-pl": {
          "hash": "6721555c",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.pl-pl.6721555c.json"
        },
        "pt-br": {
          "hash": "4ec8e8e3",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.pt-br.4ec8e8e3.json"
        },
        "ru-ru": {
          "hash": "cd167fa1",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.ru-ru.cd167fa1.json"
        },
        "zh-cn": {
          "hash": "a48708f9",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.zh-cn.a48708f9.json"
        },
        "zh-tw": {
          "hash": "f23b16ac",
          "url": "https://game-rainbow6.ubi.com/assets/locales/locale.zh-tw.f23b16ac.json"
        }
      }
    }
  }
}
```

You can also pass a `merged=true` query param to merge localized and unlocalized objects

```json
{
  "locales": {
    "locale": {
      "cs-cz": {
        "hash": "3002ab6a",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.cs-cz.3002ab6a.json"
      },
      "de-de": {
        "hash": "450f7436",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.de-de.450f7436.json"
      },
      "en-us": {
        "hash": "32a22eb2",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.en-us.32a22eb2.json"
      },
      "es-es": {
        "hash": "d6ff48d7",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.es-es.d6ff48d7.json"
      },
      "es-mx": {
        "hash": "fcc5bff7",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.es-mx.fcc5bff7.json"
      },
      "fr-fr": {
        "hash": "7696e53e",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.fr-fr.7696e53e.json"
      },
      "it-it": {
        "hash": "79d99902",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.it-it.79d99902.json"
      },
      "ja-jp": {
        "hash": "8b39ed81",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.ja-jp.8b39ed81.json"
      },
      "ko-kr": {
        "hash": "1853644a",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.ko-kr.1853644a.json"
      },
      "nl-nl": {
        "hash": "0128d091",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.nl-nl.0128d091.json"
      },
      "pl-pl": {
        "hash": "6721555c",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.pl-pl.6721555c.json"
      },
      "pt-br": {
        "hash": "4ec8e8e3",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.pt-br.4ec8e8e3.json"
      },
      "ru-ru": {
        "hash": "cd167fa1",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.ru-ru.cd167fa1.json"
      },
      "zh-cn": {
        "hash": "a48708f9",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.zh-cn.a48708f9.json"
      },
      "zh-tw": {
        "hash": "f23b16ac",
        "url": "https://game-rainbow6.ubi.com/assets/locales/locale.zh-tw.f23b16ac.json"
      }
    }
  },
  "data": {
    "ranks": {
      "hash": "c2baadef",
      "url": "https://game-rainbow6.ubi.com/assets/data/ranks.c2baadef.json"
    },
    "seasons": {
      "hash": "11bfe9f0",
      "url": "https://game-rainbow6.ubi.com/assets/data/seasons.11bfe9f0.json"
    },
    "operators": {
      "hash": "a45bd7c1",
      "url": "https://game-rainbow6.ubi.com/assets/data/operators.a45bd7c1.json"
    },
    "weapons": {
      "hash": "8a9b3d9e",
      "url": "https://game-rainbow6.ubi.com/assets/data/weapons.8a9b3d9e.json"
    },
    "rewards": {
      "hash": "99e8723c",
      "url": "https://game-rainbow6.ubi.com/assets/data/rewards.99e8723c.json"
    }
  }
}
```