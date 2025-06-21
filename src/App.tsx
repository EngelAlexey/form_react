import { useForm } from 'react-hook-form';
import { usePapaParse } from 'react-papaparse';
import {useNavigate} from 'react-router-dom';

			import { Container, Grid, Paper, Typography } from '@mui/material';
    
			interface FormData {
				txtArchi: FileList;
				delimiter: string;
			}

			const App = () => {
				const navigate = useNavigate();
				const { register, handleSubmit } = useForm<FormData>();
				const parse: any = usePapaParse();
			
				const onSubmit = (data: FormData) => {
					const archivo: any = data.txtArchi[0];
			
					const reader = new FileReader();
					reader.onload = (e) => {
						const contenido = e.target?.result;
			
						parse.readString(contenido, {
							delimiter: data.delimiter,
							header: false,
							dynamicTyping: true,
							complete: (result: any) => {
								console.log('Datos procesados:', result.data);
								navigate('/procesar', { state: { contenido: result.data } });
							},
						});
					};
			
					if (archivo) reader.readAsText(archivo);
				};

				return (
					<Container maxWidth="sm" style={{ maxWidth: 'md', marginTop: '15px' }}>
						<Paper elevation={3} style={{ padding: '5px' }}>
							<Grid container alignItems="center" direction="column" spacing={2} style={{ padding: '5px' }}>
								<Typography variant="h5">Lectura de archivos CSV</Typography>
								<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
									<Grid container spacing={2} direction="column">
										<Grid>
											<input
												{...register('txtArchi', { required: true })}
												type="file"
												style={{ width: '100%', padding: '5px', fontSize: '13px' }}
											/>
										</Grid>
										<Grid>
											<label style={{ fontSize: '13px' }}>Selecciona el delimitador:</label>
											<select
												{...register('delimiter', { required: true })}
												style={{ width: '100%', padding: '5px', fontSize: '13px' }}>
												<option value=";">Punto y coma (;)</option>
												<option value=",">Coma (,)</option>
												<option value="\t">Tabulación (\t)</option>
												<option value="|">Barra vertical (|)</option>
											</select>
										</Grid>
										<Grid>
											<button type="submit" style={{ padding: '10px 15px', fontSize: '13px' }}>
												Procesar
											</button>
										</Grid>
									</Grid>
								</form>
							</Grid>
						</Paper>
					</Container>
				);
			};

			export default App;
