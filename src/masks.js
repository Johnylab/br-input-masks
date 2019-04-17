const regex = {
  spaces: / +/gi,
  slashes: /\/+/gi,
  not_digits: /[^0-9]+/gi,
  not_alpha: /[^-'a-zA-ZÀ-ÖØ-öø-ſ ]+/gi,
  not_date_chars: /[^0-9/]/gi,
  postal: /^(\d{5})-?(\d{1,3})/,
  tel: /^(\d{2})(\d{1,5})?(\d{4})?$/,
  rg: /^(\d{1,2})(\d{1,3})?(\d{1,3})?(\d)?$/,
  cnpj: /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})?/,
  cpf: /^(\d{1,3})?(\d{1,3})?(\d{1,3})?(\d{1,2})?/,
  date: /^(\d\/|\d{2})\/*(\d\/|\d{2})?\/*(\d{1,4})?/,
};

export const name = val => val
  .replace(regex.not_alpha, '')
  .replace(regex.spaces, ' ')
  .toUpperCase();

export const postalCode = val => val
  .replace(regex.not_digits, '')
  .substr(0, 8)
  .replace(regex.postal, '$1-$2');

export const tel = val => val
  .replace(regex.not_digits, '')
  .substr(0, 11)
  .replace(regex.tel, (
    all, ddd, area, final,
  ) => (
    `${
      ddd ? `(${ddd}` : ''
    }${
      area ? `) ${area}` : ''
    }${
      final ? `-${final}` : ''
    }`
  ));

export const rg = val => val
  .replace(regex.not_digits, '')
  .substr(0, 9)
  .replace(regex.rg, (
    all, p1, p2, p3, p4,
  ) => {
    const lastChar = val.substr(-1, 1);
    const x = lastChar.toUpperCase() === 'X' ? '-X' : '';
    return `${
      p1 || ''
    }${
      p2 ? `.${p2}` : ''
    }${
      p3 ? `.${p3}` : ''
    }${
      p4 ? `-${p4}` : x
    }`;
  });

export const cnpj = val => val
  .replace(regex.not_digits, '')
  .substr(0, 14)
  .replace(regex.cnpj, (
    all, p1, p2, p3, p4, p5,
  ) => `${
    p1 || ''
  }${
    p2 ? `.${p2}` : ''
  }${
    p3 ? `.${p3}` : ''
  }${
    p4 ? `/${p4}` : ''
  }${
    p5 ? `-${p5}` : ''
  }`)

export const cpf = val => val
  .replace(regex.not_digits, '')
  .substr(0, 11)
  .replace(regex.cpf, (
    all, p1, p2, p3, p4,
  ) => `${
    p1 || ''
  }${
    p2 ? `.${p2}` : ''
  }${
    p3 ? `.${p3}` : ''
  }${
    p4 ? `-${p4}` : ''
  }`);

const isCNPJ = val => regex.cnpj.test(
  val.replace(regex.not_digits, ''),
);

export const cpfcnpj = val => isCNPJ(val) ? cnpj(val) : cpf(val);

const padZero = (str) => {
  if (str === null || typeof str === 'undefined') {
    return '';
  }
  const n = str.replace(regex.slashes, '');
  if (n.toString().length === 1 && Number(n) > 0) {
    return `0${n}`;
  }
  return n;
}

export const date = val => val
  .replace(regex.slashes, '/')
  .replace(regex.not_date_chars, '')
  .replace(regex.date, (
    all, dd, mm, yyyy,
  ) => `${
    padZero(dd) || ''
  }${
    mm ? `/${padZero(mm)}` : ''
  }${
    yyyy ? `/${yyyy}` : ''
  }`)
  .substr(0, 10);

export const email = val => val.toLowerCase();
