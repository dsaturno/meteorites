$(document).ready(function(){
  var token = '5Jg6AlHXMzgOUi33YHU1ixGRL',
      meteorites   = [],
      m_name       = [],
      m_mass_g     = [],
      m_fell_found = [],
      m_year       = [],
      m_latitude   = [],
      m_longitude  = [];

  // world map
  var map = new Datamap({
    element: document.getElementById('basic'),
    fills: {
      defaultFill: '#A8DBA8'
    },
    geographyConfig: {
      highlightFillColor: 'lightblue',
      highlightBorderColor: 'white'
    }
  }); // end map

  $.ajax({
    type: 'GET',
    url: 'https://data.nasa.gov/resource/y77d-th95.json',
    beforeSend: function (request) {
      request.setRequestHeader("X-App-Token", token);
    }
  }).done(function(response) {
    $.each(response, function(prop, obj) {
      m_fell_found.push(obj.fall);
      m_mass_g.push(parseInt(obj.mass));
      m_name.push(obj.name);
      m_latitude.push(obj.reclat);
      m_longitude.push(obj.reclong);
      if (typeof obj.year !== "undefined") {
        m_year.push(parseInt(obj["year"].substr(0, 4)));
      } else {
        m_year.push("N/A");
      }
    }); // end each

    // populate meteorites array with corresponding values
    var num_of_meteorites = m_name.length;
    for (var i = 0; i < num_of_meteorites; i++) {
      meteorites.push({
        name:       m_name[i],
        mass_g:     m_mass_g[i],
        fell_found: m_fell_found[i],
        year:       m_year[i],
        latitude:   m_latitude[i],
        longitude:  m_longitude[i],
        radius: 1.5
      });
    }

    map.bubbles(meteorites, {
      borderColor: '#D85332',
      borderWidth: 1.2,
      popupTemplate: function (geo, data) {
              return [
                '<div class="hoverinfo"><strong>' +  data.name,
                '</strong><br/>Mass (g): '        +  data.mass_g,
                '<br/>Fell/Found: '               +  data.fell_found + '',
                '<br/>Year: '                     +  data.year + '',
                '</div>'].join('');
      }
    }); // end bubbles
  }); // end done
}); // end ready
