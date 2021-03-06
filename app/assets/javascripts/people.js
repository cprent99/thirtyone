function updateNewPersonButton(input)
{
    var value = input.value;
    var add_button = $('#newperson');
    if ( value != "" ) {
        add_button.removeClass('hide');
        add_button.html('+ Add ' + value);
    } else {
        add_button.addClass('hide');
        add_button.html('');
    }
}

function showNewPersonDiv(input)
{
    var value = input.value;
    var names = value.split(" ");

    // TODO: Need to extract first and last name from the input value
    //       and populate the firstname and lastname fields in the new form

    // TODO: Animations need to be a bit smoother
    var search = $("#search").val();
    var search_array = search.split(" ");
    $("#person_firstname").val(search_array[0]);
    $("#person_lastname").val(search_array[1]);
    $("#searcharea").slideUp();
    $("#results").slideUp(
    { complete: function()
        {
            $("#newperson_div").slideDown();
            $(input).hide();
        }
    });
}

function updatePersonSearch(input)
{
    updateNewPersonButton(input);
    if(input.value.length > 0){
        var search_key_array = input.value.split(" ");
        var search_keys = JSON.stringify(search_key_array);

        var request = $.ajax({
            url: "/people/search",
            type: "GET",
            data: { search : search_keys,
                    ajax   : true },
            dataType: "html"
        });

        request.done(function( html ) {
            $( "#results" ).html( html );
        });

        request.fail(function( jqXHR, textStatus ) {
            alert( "Search update failed: " + textStatus );
        });
    }
    else{
        var request = $.ajax({
            url: "/people/search",
            type: "GET",
            data: { ajax   : true },
            dataType: "html"
        });

        request.done(function( html ) {
            $( "#results" ).html( html );
        });

        request.fail(function( jqXHR, textStatus ) {
            alert( "Search update failed: " + textStatus );
        });
    }
}

function editPerson(button)
{
    //alert("Edit Person engaged.");

    var li = $(button).closest("li");
    var editting_div = $(li).find(".editting_div");
    editting_div.show();
    var edit_button = $(li).find(".edit_button");
    edit_button.hide();
    var raw1 = $(li).find(".raw1");
    raw1.hide();
    var raw2 = $(li).find(".raw2");
    raw2.hide();
    var edit_fields1 = $(li).find(".edit_fields1");
    edit_fields1.show();
    var edit_fields2 = $(li).find(".edit_fields2");
    edit_fields2.show();
}

function savePerson(button)
{
    alert("You clicked the Save button.  Conglatumations!")
}

function cancelEdit(button)
{
    //alert("Cancel Button engaged.");

    var li = $(button).closest("li");
    var editting_div = $(li).find(".editting_div");
    editting_div.hide();
    var edit_button = $(li).find(".edit_button");
    edit_button.show();
    var raw1 = $(li).find(".raw1");
    raw1.show();
    var raw2 = $(li).find(".raw2");
    raw2.show();
    var edit_fields1 = $(li).find(".edit_fields1");
    edit_fields1.hide();
    var edit_fields2 = $(li).find(".edit_fields2");
    edit_fields2.hide();
}