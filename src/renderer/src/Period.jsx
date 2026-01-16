import { useState } from 'react'
import {
  Box,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import 'dayjs/locale/uk'

function Period({ periodId, data, handleChange, handleDeletePeriod }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <Stack direction="row" 
      spacing={1} 
        alignItems="left" 
        sx={{ width: '100%', mt: 2 }}>
        <DatePicker
          size="small"
          label="Дата початку"
          sx={{ flex: 2 }}
          value={data.begDate ? dayjs(data.begDate, 'YYYY-MM-DD') : null}
          onChange={(newValue) =>
            handleChange(
              periodId,
              'begDate',
              newValue ? dayjs(newValue).format('YYYY-MM-DD') : null,
            )
          }
          slotProps={{ textField: { size: 'small' } }}
        />
        <DatePicker
          size="small"
          label="Дата кінця"
          sx={{ flex: 2 }}
          value={data.endDate ? dayjs(data.endDate, 'YYYY-MM-DD') : null}
          onChange={(newValue) =>
            handleChange(
              periodId,
              'endDate',
              newValue ? dayjs(newValue).format('YYYY-MM-DD') : null,
            )
          }
          slotProps={{ textField: { size: 'small' } }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', flex: 3 }}>
          <span style={{ marginRight: 8, marginLeft: 24 }}>Коеф:</span>
          <RadioGroup
            row
            value={data.multiplier}
            onChange={(e) => handleChange(periodId, 'multiplier', e.target.value)}
            sx={{ flexWrap: 'nowrap' }}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="1.5" control={<Radio />} label="1.5" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
          </RadioGroup>
        </Box>

        <IconButton
          size="small"
          title="Видалити період"
          color="error"
          onClick={() => handleDeletePeriod(periodId)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </LocalizationProvider>
  )
}

export default Period
