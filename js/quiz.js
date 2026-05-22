/* Quiz — Síndrome do Olho Seco | Genom */

$(document).ready(function () {

  var soma_total_1 = 0;

  function zeraGrupo(ngrupo) {
    $('.grp' + ngrupo).addClass('st-style2');
    $('.grp' + ngrupo).removeClass('st-style1');
  }

  function Soma(gpo, bto, resp, rval) {
    zeraGrupo(gpo);
    $('#resp_' + gpo + 'b').val(rval);
    $('#resp_' + gpo).val(resp);
    $('#submit' + bto).removeClass('st-style2');
    $('#submit' + bto).addClass('st-style1');

    if (gpo == 1) { $('#p1').hide('slow'); $('#p2').show('slow'); }
    if (gpo == 2) { $('#p2').hide('slow'); $('#p3').show('slow'); }
    if (gpo == 3) { $('#p3').hide('slow'); $('#p4').show('slow'); }
    if (gpo == 4) { $('#p4').hide('slow'); $('#p5').show('slow'); }
    if (gpo == 5) { $('#p5').hide('slow'); $('#p6').show('slow'); }
    if (gpo == 6) { $('#p6').hide('slow'); $('#p7').show('slow'); }
    if (gpo == 7) { $('#p7').hide('slow'); $('#p8').show('slow'); }
    if (gpo == 8) { $('#p8').hide('slow'); $('#p10').show('slow'); }
  }

  function ValidaAll() {
    var ert = 1;
    for (var rp = 1; rp <= 8; rp++) {
      if ($('#resp_' + rp).val() == '') { ert = 0; }
    }
    return ert;
  }

  function Resulta() {
    soma_total_1 = parseInt($('#resp_4').val());
    soma_total_1 += parseInt($('#resp_5').val());
    soma_total_1 += parseInt($('#resp_6').val());
    soma_total_1 += parseInt($('#resp_7').val());
    soma_total_1 += parseInt($('#resp_8').val());

    if (!ValidaAll()) {
      alert('Responda todas as perguntas');
    } else {
      $('#res_form').show();
      $('#submitok').prop('disabled', true);
      $('#submitok').prop('readonly', true);
    }
    $('#p10').hide();
  }

  function enviaAll() {
    if ($('#politica').prop('checked')) {
      var vok = 1;

      if ($('#nome').val() == '')    { vok = 0; }
      if ($('#idade').val() == '')   { vok = 0; }
      if ($('#sexo').val() == '')    { vok = 0; }
      if ($('#cidade').val() == '')  { vok = 0; }
      if ($('#uf').val() == '')      { vok = 0; }
      if ($('#email').val() == '')   { vok = 0; }

      if (vok) {
        $.ajax({
          method: 'POST',
          url: 'https://www.genom.com.br/envia_data.php',
          data: {
            p_resp_10: $('#resp_10b').val(),
            p_resp_4:  $('#resp_4b').val(),
            p_resp_5:  $('#resp_5b').val(),
            p_resp_6:  $('#resp_6b').val(),
            p_resp_7:  $('#resp_7b').val(),
            p_resp_8:  $('#resp_8b').val(),
            p_resp_3:  $('#resp_3b').val(),
            p_resp_2:  $('#resp_2b').val(),
            p_resp_1:  $('#resp_1b').val(),
            p_total_s: soma_total_1,
            token:     'd585b46d9f6f6cced87468f472c83f8b',
            p_nome:    $('#nome').val(),
            p_idade:   $('#idade').val(),
            p_sexo:    $('#sexo').val(),
            p_cidade:  $('#cidade').val(),
            p_uf:      $('#uf').val(),
            p_email:   $('#email').val()
          },
          cache: false
        }).done(function (html) {
          var str = html;
          str.trim();
          if (str == 'OK') {
            $('#appointment-form-2').trigger('reset');
            var formd = document.getElementById('appointment-form-2');
            formd.reset();
            $('#res_form').hide('slow');
            $('#res_ok').show('slow');
          } else {
            alert('Erro. Tente novamente');
          }
        });
      } else {
        alert('Preencha todos os campos.');
      }
    } else {
      alert('É necessário concordar com o Termo de Uso e a Política de Privacidade para continuar.');
    }
  }

  // Expor funções globalmente para uso inline nos botões HTML
  window.Soma = Soma;
  window.Resulta = Resulta;
  window.enviaAll = enviaAll;

  // Ocultar painéis do quiz na inicialização
  $('#p2').hide();
  $('#p3').hide();
  $('#p4').hide();
  $('#p5').hide();
  $('#p6').hide();
  $('#p7').hide();
  $('#p8').hide();
  $('#p10').hide();

}); // fim $(document).ready

// Intersection Observer — animações fade-in e contador animado
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  // Contador animado — dispara apenas quando entra na viewport
  const counter = document.querySelector('.counter');
  if (counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    let started = false;
    const counterObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !started) {
        started = true;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(function () {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          counter.textContent = Math.floor(current);
        }, 30);
        counterObs.unobserve(counter);
      }
    }, { threshold: 0.5 });
    counterObs.observe(counter);
  }
});
