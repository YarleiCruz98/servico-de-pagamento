const assert = require('node:assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {
  let servicoDePagamento;

  beforeEach(() => {
    servicoDePagamento = new ServicoDePagamento();
  });

  describe('pagar', () => {
    it('deve registrar pagamento com categoria cara quando valor for maior que 100', () => {
      const pagamento = servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

      assert.strictEqual(pagamento.codigoBarras, '0987-7656-3475');
      assert.strictEqual(pagamento.empresa, 'Samar');
      assert.strictEqual(pagamento.valor, 156.87);
      assert.strictEqual(pagamento.categoria, 'cara');
    });

    it('deve registrar pagamento com categoria padrão quando valor for menor ou igual a 100', () => {
      const pagamento = servicoDePagamento.pagar('1234-5678-9012', 'Copasa', 100);

      assert.strictEqual(pagamento.codigoBarras, '1234-5678-9012');
      assert.strictEqual(pagamento.empresa, 'Copasa');
      assert.strictEqual(pagamento.valor, 100);
      assert.strictEqual(pagamento.categoria, 'padrão');
    });

    it('deve armazenar múltiplos pagamentos na lista interna', () => {
      servicoDePagamento.pagar('1111-1111-1111', 'Empresa A', 50);
      servicoDePagamento.pagar('2222-2222-2222', 'Empresa B', 150);

      assert.strictEqual(servicoDePagamento.pagamentos.length, 2);
    });
  });

  describe('consultarUltimoPagamento', () => {
    it('deve retornar o último pagamento realizado', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      servicoDePagamento.pagar('9999-8888-7777', 'Cemig', 45.5);

      const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.deepStrictEqual(ultimoPagamento, {
        codigoBarras: '9999-8888-7777',
        empresa: 'Cemig',
        valor: 45.5,
        categoria: 'padrão',
      });
    });

    it('deve retornar null quando não houver pagamentos', () => {
      assert.strictEqual(servicoDePagamento.consultarUltimoPagamento(), null);
    });
  });
});
