class AddressUtil {
  address = data => data?.address ?? '';

  isDefault = data => data?.is_default == 1 ?? false;

  zipCode = data => data?.zip_code ?? '';

  state = data => data?.state ?? '';

  city = data => data?.city ?? '';

  country = data => data?.country ?? '';

  label = data => data?.label ?? '';

  id = data => data?._id ?? '';

  lat = data => data?.lat ?? '';

  lng = data => data?.lng ?? '';

  addressDetail = data => data?.address_detail ?? '';

  noteToRider = data => data?.note_to_rider ?? '';
}
export default new AddressUtil();
