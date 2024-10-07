
import { useState } from 'react'

export default function Form() {
  const [isPaid, setIsPaid] = useState(false)
  const [formValues, setFormValues] = useState({
    unpaidTitle:  'Unpaid Title',
    paidTitle:  'Paid Title',
    unpaidContent: 'Unpaid Content',
    paidContent: 'Paid Content',
    price: 0.0,
    unpaidImage: '',
    paidImage: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const fieldName = isPaid ? 'paidImage' : 'unpaidImage'

    reader.onloadend = () => {
      setFormValues({ ...formValues, [fieldName]: reader.result })
    }

    if (file) reader.readAsDataURL(file)
  }

  return (
    <div className="flex justify-center items-center px-40 pt-32 pl-48">

      {/* Left-side Preview */}
      <div className="flex flex-col p-4 w-1/3   bg-white  rounded-lg shadow-lg break-words">
        <div className="w-full  rounded-lg mb-4">
          {isPaid && formValues.paidImage ? (
            <img src={formValues.paidImage} alt="Preview" className="object-cover h-full w-full" />
          ) : formValues.unpaidImage ? (
            <img src={formValues.unpaidImage} alt="Preview" className="object-cover h-full w-full" />
          ) : (
            <div className="text-center text-gray-500 bg-slate-300 h-80 flex justify-center items-center">No image uploaded</div>
          )}
        </div>
        <div className="mb-2 text-lg font-bold">
          {isPaid ? formValues.paidTitle  : formValues.unpaidTitle }
        </div>
        <div className="mb-2">
          {isPaid ? formValues.paidContent : formValues.unpaidContent}
        </div>
      
        <button className="px-4 py-2 bg-[--primary-mid] text-white rounded-lg shadow-md">Verify</button>
      </div>

      {/* Right-side Form */}
      <div className="flex-1 ml-6 p-6 self-start">
        {/* Paid/Unpaid Toggle */}
        <div className="cursor-pointer flex border border-purple-300 mb-6 w-fit bg-white rounded-lg overflow-hidden ">
          <button
            className={`px-4 py-2  ${!isPaid ? 'bg-[--primary-mid]' : 'bg-transparent text-[--primary-mid]'}`}
            onClick={() => setIsPaid(!isPaid)}
          >
            Unpaid
          </button>
          <button
            className={`px-4 py-2 ${isPaid ? 'bg-[--primary-mid]' : 'bg-transparent text-[--primary-mid]'}`}
            onClick={() => setIsPaid(!isPaid)}
          >
            Paid
          </button>
          
        </div>

        {/* Form */}
        <div className="flex flex-col space-y-4 ">
          <label className='text-left text-lg'>
            Title
            <input
              type="text"
              name={isPaid ? 'paidTitle' : 'unpaidTitle'}
              value={isPaid ? formValues.paidTitle : formValues.unpaidTitle}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 border border-purple-300 rounded-md"
            />
          </label>

          <label className='text-left text-lg'>
            Content
            <textarea
              name={isPaid ? 'paidContent' : 'unpaidContent'}
              value={isPaid ? formValues.paidContent : formValues.unpaidContent}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 border border-purple-300 rounded-md"
            />
          </label>
          <div className='flex'>

            <label className='text-left text-lg'>
              Price
              <input
                type="text"
                name={'price'}
                value={ formValues.price}
                onChange={handleInputChange}
                className="block w-full p-2 mt-1 border border-purple-300 rounded-md"
                />
            </label>

            <label for="image-input" className='text-left text-lg ml-20 image-input-label'>
              Image
              <div className='bg-[--primary-mid] text-white pl-7 overflow-hidden h-3/5 block w-32 p-2 mt-1 border rounded-md '>
              <input
                id="image-input"
                type="file"
                onChange={handleFileChange}
                className="w-full h-full"
                />
                Upload
                </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
