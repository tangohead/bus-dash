var map = L.map('mapid').setView([51.751, -1.257], 13);
var json_url = "https://buses-dash-app.s3.eu-west-2.amazonaws.com/current_bus_locations.json"
var bus_icon = L.icon({
    iconUrl: 'static/bus-icon.png',
    iconSize: [15,15]
});

$.getJSON(json_url, function(data){
    
    bus_data = data.data;

    for(i = 0; i < bus_data.length; i++) {

        L.marker(
            [bus_data[i].vehicle_lat, bus_data[i].vehicle_lon],
            {icon: bus_icon}
        ).addTo(map).bindPopup(
            "Line: " + bus_data[i].line_name + "<br>" 
            + "Origin: " + bus_data[i].origin_name + "<br>"
            + "Dest: " + bus_data[i].destination_name + "<br>"
            + "Last update: " + bus_data[i].timestamp
        );
    }
    $('#bus-status').text(`Updated at ${bus_data.timestamp}`)
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();
