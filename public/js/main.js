$(document).ready(function(){
  var meteorites_file = '../meteorites.json';

  var m_name       = new Array();
  var m_mass_g     = new Array();
  var m_fell_found = new Array();
  var m_year       = new Array();
  var m_latitude   = new Array();
  var m_longitude  = new Array();

  // world map
  var map = new Datamap({
    element: document.getElementById('map-container'),
    fills: {
      defaultFill: 'gray'
    },
    geographyConfig: {
      highlightFillColor: 'lightpink'
    }
  }); // end map

  $.getJSON(meteorites_file, function(response) {

    $.each(response, function(prop, val) {
      if (prop === "data") {
          for (var j = 0, k = val.length; j < k; j++) {
            m_name.push(val[j][8]);
            m_mass_g.push(parseInt(val[j][12]));
            m_fell_found.push(val[j][13]);
            // won't work otherwise, even though there are no null values
            if (val[j][14] !== null)
              m_year.push(parseInt(val[j][14].substr(0, 4)));

            m_latitude.push(val[j][15]);
            m_longitude.push(val[j][16]);
          }
      }
    }); // end each

    var num_of_meteorites = m_name.length;
    var meteorites = new Array();
    // populate meteorites array with corresponding values
    for (var i = 0; i < num_of_meteorites; i++) {
      meteorites.push({
        name:       m_name[i],
        mass_g:     m_mass_g[i],
        fell_found: m_fell_found[i],
        year:       m_year[i],
        latitude:   m_latitude[i],
        longitude:  m_longitude[i],
        radius: 0.5
      });
    }

    map.bubbles(meteorites, {
      popupTemplate: function (geo, data) {
              return ['<div class="hoverinfo">' +  data.name,
              '<br/>Mass (g): ' +  data.mass_g,
              '<br/>Fell/Found: ' +  data.fell_found + '',
              '<br/>Year: ' +  data.year + '',
              '</div>'].join('');
      }
    }); // end bubbles


  }); // end getJSON
}); // end ready
