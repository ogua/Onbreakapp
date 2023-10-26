const deletedata = (id) => {

    setLoading(true);

    axios.delete(schoolzapi+'/academicterms/'+id,
    {
        headers: {Accept: 'application/json',
        Authorization: "Bearer "+token
    }
    })
      .then(function (response) {
        const newData = data.filter((item) => item.id != id);
        setFilterdata(newData);
        setData(newData);
        
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
}