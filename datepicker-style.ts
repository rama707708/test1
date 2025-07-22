$('#your-datepicker-id').datepicker({

     showButtonPanel: true,
    closeText: 'Close',
    currentText: 'Today',
    onClose: function(dateText: string, inst: any) {
      // Optional: handle closing
    },
    
    beforeShow: function(input, inst) {
      setTimeout(() => {
        const $input = $(input);
        const offset = $input.offset();
        const height = $input.outerHeight();
        const datepicker = $('#ui-datepicker-div');

        // Position above the input
        datepicker.css({
          top: offset.top - datepicker.outerHeight() - 10 + 'px', // adjust -10 for spacing
          left: offset.left + 'px',
          position: 'absolute',
          zIndex: 1050
        });
      }, 0);
    },
    onChangeMonthYear: function(year, month, inst) {
      setTimeout(() => {
        const $input = $(inst.input);
        const offset = $input.offset();
        const height = $input.outerHeight();
        const datepicker = $('#ui-datepicker-div');

        // Re-position on month/year change
        datepicker.css({
          top: offset.top - datepicker.outerHeight() - 10 + 'px',
          left: offset.left + 'px'
        });
      }, 0);
    }
  });
